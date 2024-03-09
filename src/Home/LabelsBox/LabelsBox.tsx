import React from 'react'
import toast from 'react-hot-toast';
import styles from "./LabelsBox.module.scss"
import { useRecoilState } from 'recoil';
import { userNameState, userTagSelectState } from '../../Components/Recoil/Atoms';
import Button from '../../Components/Common/Button/Button';

function LabelsBox({
    value,
    setValue,
    tags,
    setTags,
}: {
    value: any
    setValue: React.Dispatch<React.SetStateAction<any>>
    tags: any
    setTags: React.Dispatch<React.SetStateAction<any>>
}) {

    const [tagSelect, setTagSelect] = useRecoilState(userTagSelectState);
    const [userName, setUserName] = useRecoilState(userNameState)


    const valueHandler = (e: React.ChangeEvent<HTMLInputElement>, item: string) => {
        setValue({
            ...value,
            [e.target.name]: [e.target.value]
        })
    }

    const resetValueHandler = (item: string) => {
        setValue({
            ...value,
            [item]: [""]
        })
    }

    const warningHandler = () => {
        toast.error("You cannot change the tags of other users", {
            style: {
              padding: '10px',
              color: 'black',
              backgroundColor: "orange",
            },
            icon: '!!!',
            iconTheme: {
              primary: 'black',
              secondary: "orange",
            },
        });
    }


  return (
    <div className={styles.attributeContainer}>
        <div className={styles.attributeItemContainer}>
            {Object.keys(tags).map((item: any, index: any) => (
                <div key={item} className={styles.attributeCard} style={{marginTop: index ? "10px" : ""}}>
                    <div className={styles.attributeName}>
                        <h3>{item.replaceAll("_", " ")}</h3>
                        {(value[item] && !!value[item].join("") && tagSelect === userName) && 
                            <Button
                                title="reset"
                                color="danger"
                                shape="square"
                                fill="info"
                                // icon="close"
                                expand="block" 
                                iconWidth="1.7rem"
                                iconHeight="1.7rem"
                                direction="row_reverse"
                                onClick={() => resetValueHandler(item)} 
                                classNames={{
                                    container: styles.resetValueBtn
                                }}
                            />
                        }
                    </div>

                    <div className={styles.tagItem}>
                        {tags[item as any].map((radio: any) => (
                            <label 
                                key={radio}
                                className={`${
                                    styles.attributeItemBox} ${
                                    ((Object.keys(value).length && value[item]) && value[item].find((item: any) => item === radio)) ? styles.attributeItemBoxOn : styles.attributeItemBoxOff
                                }`}
                            >
                                {radio.replaceAll("_", " ")}
                                <input 
                                    type="radio" 
                                    name={item} 
                                    checked={!!(Object.keys(value).length && value[item]) && value[item].find((item: any) => item === radio) ? true : false} 
                                    value={radio} 
                                    onChange={tagSelect === userName ? (e) => valueHandler(e, item) : warningHandler}
                                    className={styles.radioBtn}
                                />
                            </label>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default LabelsBox;