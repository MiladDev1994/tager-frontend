import React from 'react'
import Button from '../../Components/Common/Button/Button';
import styles from "./Header.module.scss"
import { useRecoilState } from 'recoil';
import { AllRecordLength, Index, UserState, userNameState, userTagSelectState } from '../../Components/Recoil/Atoms';
import { useNavigate } from 'react-router-dom';

function Header({
    image, 
    setImage,
    allTags, 
    setAllTags,
    value, 
    setValue,
}: {
    image: any
    setImage: React.Dispatch<React.SetStateAction<any>>
    allTags: any
    setAllTags: React.Dispatch<React.SetStateAction<any>>
    value: any
    setValue: React.Dispatch<React.SetStateAction<any>>
}) {

    const navigate = useNavigate()
    const [userName, setUserName] = useRecoilState(userNameState)
    const [tagSelect, setTagSelect] = useRecoilState(userTagSelectState);
    const [allRecordLength, setAllRecordLength] = useRecoilState(AllRecordLength);
    const [userData, setUserData] = useRecoilState(UserState);
    const [index, setIndex] = useRecoilState(Index)

    const logOutHandler = () => {
        setUserName("")
        navigate("/login")
        setValue({})
    }

    return (
        <div className={styles.navbarContainer}>
            <div className={styles.navbar}>
                <Button
                    title={userName}
                    color="gray"
                    titleColor='black'
                    shape="round"
                    fill="transparent"
                    icon="user"
                    
                    expand="block" 
                    iconWidth="1.3rem"
                    iconHeight="1.4rem"
                    // direction="row_reverse"
                    onClick={logOutHandler} 
                    classNames={{
                        container: styles.btnContainer
                    }}
                    outlineColor='gray'
                    outLineSize='2px'
                />

                <Button 
                    title={image && image.folderPath.split("\\").pop()}
                    color="gray"
                    titleColor='black'
                    shape="round"
                    fill="transparent"
                    expand="block" 
                    direction="row_reverse"
                    classNames={{
                        container: styles.nameBadgeContainer
                    }}
                    isBadge
                    outlineColor='gray'
                    outLineSize='2px'
                />

                <Button 
                    title={`${index} / ${allRecordLength}`}
                    color="gray"
                    titleColor='black'
                    shape="round"
                    fill="transparent"
                    expand="block" 
                    direction="row_reverse"
                    classNames={{
                        container: styles.IndexBadgeContainer
                    }}
                    isBadge
                    outlineColor='gray'
                    outLineSize='2px'
                />

                <select 
                    className={styles.userTagSelect}
                    onChange={(e: any) => {
                        setTagSelect(e.target.value)
                        Object.keys(allTags).includes(e.target.value) ?
                            setValue(allTags[e.target.value]) :
                            setValue({})
                    }}
                    value={tagSelect}
                    
                >
                    {!Object.keys(allTags).includes(userName) && 
                        <option key={userName} value={userName}>{userName}</option>
                    }
                    {Object.keys(allTags).map((item, index) => 
                        <option key={index} value={item}>{item}</option>
                    )}
                </select>
            </div>
            
        </div>
    )
}

export default Header;