import React, { useState } from 'react'
import Button from '../../Components/Common/Button/Button';
import styles from "./ActionBox.module.scss"
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { DirectoryState, Index, UserState, userNameState, userTagSelectState } from '../../Components/Recoil/Atoms';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { userPathsCreator } from '../../Utils/UsersPathUtil';
import { findLastIndexSeen } from '../../Utils/FindLastIndexSeen';

function ActionBox({
    image, 
    setImage,
    allTags, 
    setAllTags,
    value, 
    setValue,
    tags, 
    setTags,
}: {
    image: any;
    setImage: React.Dispatch<React.SetStateAction<any>>;
    allTags: any;
    setAllTags: React.Dispatch<React.SetStateAction<any>>;
    value: any;
    setValue: React.Dispatch<React.SetStateAction<any>>;
    tags: any;
    setTags: React.Dispatch<React.SetStateAction<any>>;
}) {

    const navigate = useNavigate()
    const [userData, setUserData] = useRecoilState(UserState)
    const [userName, setUserName] = useRecoilState(userNameState)
    const [tagSelect, setTagSelect] = useRecoilState(userTagSelectState);
    const [index, setIndex] = useRecoilState(Index);
    const [directory, setDirectory] = useRecoilState(DirectoryState);
    const [loading, setLoading] = useState(false)


    const pasteHandler = () => {
        setLoading(true)
        axios.get(`${process.env.REACT_APP_BASE_URL}/previous` , {
            params: {
                index: findLastIndexSeen({userData, userName, baseDirectory: directory.path, mode: directory.mode, value}), 
                value: userName === tagSelect ? value : allTags[userName], 
                userName
            },
        })
        .then(res => {
            setImage(res.data)
            if (Object.keys(res.data.tag.labels).includes(tagSelect)) {
                setValue(res.data.tag.labels[tagSelect as any]);
            } else {
                setTagSelect(userName)
            } 
            setAllTags(res.data.tag.labels)
            setUserData(userPathsCreator({userName, userData, res: res.data}))
            setIndex(res.data.index)
            setLoading(false)
        })
        .catch((error) => {
            setLoading(false)
            toast.error(error.response.data.message, {
                style: {
                  padding: '10px',
                  color: 'white',
                  backgroundColor: "red",
                },
                iconTheme: {
                  primary: 'white',
                  secondary: "red",
                },
            });
        })
    }

    const deleteHandler = () => {
        setLoading(true)
        axios.delete(`${process.env.REACT_APP_BASE_URL}/delete` , {
            params: {
                index: findLastIndexSeen({userData, userName, baseDirectory: image.baseDirectory, mode: image.mode, value: false}),  
                userName
            },
        })
        .then(res => {
            setLoading(false)
            afterHandler()
        })
        .catch((error) => {
            setLoading(false)
            toast.error(error.response.data.message, {
                style: {
                  padding: '10px',
                  color: 'white',
                  backgroundColor: "red",
                },
                iconTheme: {
                  primary: 'white',
                  secondary: "red",
                },
            });
        })
    }

    const afterHandler = (tag?: any) => {
        setLoading(true)
        axios.get(`${process.env.REACT_APP_BASE_URL}/next` , {
            params: {
                index: findLastIndexSeen({userData, userName, baseDirectory: image.baseDirectory, mode: image.mode, value}), 
                value: userName === tagSelect ? (tag ?  tag : {}) : allTags[userName],
                userName
            },
        })
        .then(res => {
            console.log(res)
            setImage(res.data)
            if (Object.keys(res.data.tag.labels).includes(tagSelect)) {
                setValue(res.data.tag.labels[tagSelect as any]);
            } else {
                setTagSelect(userName)
            } 
            setAllTags(res.data.tag.labels)
            setUserData(userPathsCreator({userName, userData, res: res.data}))
            setIndex(res.data.index)
            setLoading(false)
        })
        .catch((error) => {
            console.log(error)
            setLoading(false)
            toast.error(error.response.data.message, {
                style: {
                  padding: '10px',
                  color: 'white',
                  backgroundColor: "red",
                },
                iconTheme: {
                  primary: 'white',
                  secondary: "red",
                },
            });
        })
    }


  return (
    <div className={styles.submitContainer}>
        <div className={styles.submitBox}>
            <Button
                title="Previous" 
                color="primary"
                fill="basic"
                icon="arrowSmallLeft" 
                iconWidth="1.5rem"
                iconHeight="1.5rem"
                onClick={pasteHandler}
                classNames={{
                    container: styles.previousBtnContainer
                }}
                disabled={loading}
            />
            <Button 
                title="Delete"
                color="danger"
                fill="basic"
                icon="delete" 
                iconWidth="1.5rem"
                iconHeight="1.5rem"
                onClick={deleteHandler} 
                classNames={{
                    container: styles.deletesBtnContainer
                }}
                disabled={loading}
            />
            <Button 
                title="Next"
                color="primary"
                fill="basic"
                icon="arrowSmallRight" 
                iconWidth="1.5rem"
                iconHeight="1.5rem"
                direction="row_reverse" 
                onClick={() => afterHandler(value)} 
                classNames={{
                    container: styles.nextBtnContainer
                }}
                disabled={loading}
            />
        </div>
    </div>
  )
}

export default ActionBox;