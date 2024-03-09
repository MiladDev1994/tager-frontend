import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./HomeComponent.module.scss"
import { useNavigate } from "react-router-dom";

import { useRecoilState } from 'recoil'
import { toast } from "react-hot-toast";
import {
    AllRecordLength,
    DirectoryState,
    Index,
    userNameState, 
    UserState,
    userTagSelectState,
} from "../Components/Recoil/Atoms";

import Header from "./Header/Header";
import ActionBox from "./ActionBox/ActionBox";
import ImageBox from "./ImageBox/ImageBox";
import LabelsBox from "./LabelsBox/LabelsBox";
import { userPathsCreator } from "../Utils/UsersPathUtil";
import { findLastIndexSeen } from "../Utils/FindLastIndexSeen";



const Home = () => { 

    const navigate = useNavigate();
    const [userData, setUserData] = useRecoilState(UserState)
    const [userName, setUserName] = useRecoilState(userNameState)
    const [image, setImage] = useState<any>("")
    const [tags, setTags] = useState<any>({})
    const [value, setValue] = useState<any>({}) 
    const [allTags, setAllTags] = useState<any>({})
    const [tagSelect, setTagSelect] = useRecoilState(userTagSelectState);
    const [allRecordLength, setAllRecordLength] = useRecoilState(AllRecordLength);
    const [index, setIndex] = useRecoilState(Index)
    const [directory, setDirectory] = useRecoilState(DirectoryState);

    console.log(userData)

    const fetchFirst = () => { 
        axios.get(`${process.env.REACT_APP_BASE_URL}/next` , {
            params: {
                index: findLastIndexSeen({userData, userName, baseDirectory: directory.path, mode: directory.mode, value: false}), 
                userName,
            },
        })
        .then(res => {
            console.log(res)
            setImage(res.data)
            setTags(res.data.labels)
            setAllRecordLength(res.data.allRecordsLength)
            if (Object.keys(res.data.tag.labels).includes(userName)) setValue(res.data.tag.labels[userName as any])
            setAllTags(res.data.tag.labels)
            setUserData(userPathsCreator({userName, userData, res: res.data}))
            setIndex(res.data.index)
        })
        .catch((error) => {
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

    useEffect(() => {
        !userName && navigate('/login')
        setTagSelect(userName)
        fetchFirst()
    } , [])


    return (
        <div className={styles.container}>

            <Header 
                image={image}
                setImage={setImage}
                allTags={allTags}
                setAllTags={setAllTags}
                value={value}
                setValue={setValue}
            />

            <div className={styles.mainContainer}>
                <div className={styles.mainBox}>
                    <ImageBox
                        image={image}
                        setImage={setImage}
                    />
                    <LabelsBox
                        value={value}
                        setValue={setValue}
                        tags={tags}
                        setTags={setTags}
                    />
                </div>
            </div>

            <ActionBox 
                image={image}
                setImage={setImage}
                allTags={allTags}
                setAllTags={setAllTags}
                value={value}
                setValue={setValue}
                tags={tags}
                setTags={setTags}
            />

        </div>
    )
}

export default Home;
