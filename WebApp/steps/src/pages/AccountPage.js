import React, { useEffect, useState } from 'react';
import { MetaMaskAvatar } from 'react-metamask-avatar';
import { useParams } from 'react-router-dom';
import { useWallet } from '../utils/WalletContext';
import {ReactComponent as ParticipantsSvg} from '../assets/person-group-svgrepo-com.svg'
import {ReactComponent as Patch} from '../assets/patch.svg'
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {ReactComponent as HomeSvg} from '../assets/home.svg';

const AccountPage = () => {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate()
    const { accountAddress } = useParams();
    const { contract  } = useWallet();


    async function isUserParticipateInProject(projectName, addr, changes) {
        for (let index = 0; index < changes.length; index++) {
            const changeMakerAddress = await contract.getChangeMaker(projectName, changes[index]);
            if (addr.toLowerCase() === changeMakerAddress.toLowerCase()) {
                return true;
            }
        }

        return false;
    }


    async function getRecentActivity() {
        const lastProjectsNow = await contract.getLastProjects();
        let projectsParticipatedIn = [];

        for (const projectName of lastProjectsNow) {            
            let changes = await contract.getChangesOrProposals(projectName, true);
            const participate = await isUserParticipateInProject(projectName, accountAddress, changes);

            if (participate) {
                const participants = await contract.getAddresses(projectName);
                let uniqueAddresses = participants.filter((addr, index) => {
                    return participants.indexOf(addr) === index;
                });
                projectsParticipatedIn.push({name: projectName, participants: uniqueAddresses.length, changes: changes.length });
            }
        }
        setProjects(projectsParticipatedIn);
    }
    
    
    function getFormatAddress(address, startLength = 6, endLength = 4) {
        if (!address) return '';
      
        const start = address.substring(0, startLength);
        const end = address.substring(address.length - endLength);
      
        return `${start}...${end}`;
    }

    useEffect(() => {
        getRecentActivity()
    }, []);

    return (
    <div className='background center'>
        <div className='DistributionAndDev'>
            <div className='accountDiv'>
                <div className='leftSideAccount'>
                <div className='accountBox'>
                    <div className='centerSquare'><MetaMaskAvatar className='square' address={accountAddress} size={40} /></div>
                    <h1>{getFormatAddress(accountAddress)}</h1>
                </div>

                <motion.div whileTap={{y: 6}} whileHover={{y: 3}} exit={{scale: .91 }} transition={{ type: "spring", duration: 0.6 }} onClick={() => {navigate('/')}} className='projectHeaderAccount'>
                    <HomeSvg width={70} height={70}/>
                </motion.div>
                </div>

                <div className='accountRecentActivityBox'>
                    <h2>Recent Activity</h2>
                    <div className='projectsBoxesAccount'>
                    {projects.map((projectName, index) => (
                        <div onClick={() => {navigate(`/project/${projectName.name}`)}} key={index} className='projectBoxAccount'>
                            <span className='spanProjectName'>{projectName.name}</span> 
                            <div className="participantsDiv">
                            <ParticipantsSvg className="svgParticipants" width={30} height={30}/> 
                            <span className='spanProjectName'>{projectName.participants}</span>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default AccountPage;
