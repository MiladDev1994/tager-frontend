import React, { useState } from "react"
import styles from "./Login.module.scss"
import Button from "../Components/Common/Button/Button";
import { userNameState } from "../Components/Recoil/Atoms";
import { useRecoilState } from "recoil";
import CustomInput from "../Components/Common/CustomInput/CustomInput";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Modal from "../Components/Common/Modal/Modal";
import ModeForm from "./ModeForm/ModeForm";

const Login = () => {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [userName, setUserName] = useRecoilState(userNameState)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault()
        if (name) {
            setUserName(name)
            navigate("/")
        } else {
            toast.error("Please Enter User Name", {
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
        }
    }
    return (
        <div className={styles.formScreen}>
            <div className={styles.modeBtn}>
                <Button 
                    color="gray"
                    fill="light"
                    shape="pill"
                    direction="row_reverse" 
                    icon="settings"
                    iconWidth="2rem"
                    iconHeight="2rem"
                    expand="block"
                    onClick={() => setIsModalOpen(!isModalOpen)} 
                    classNames={{
                        container: styles.btnContainer
                    }}
                />
            </div>
            <form onSubmit={submitHandler} className={styles.formContainer}>
                <CustomInput 
                    label="User Name"
                    value={name} 
                    onChange={e => setName(e)} 
                    inputProps={{
                        placeholder: "Enter UserName",
                    }}
                    classNames={{
                        container: styles.inputContainer,
                        input: styles.input,
                        label: styles.label,
                    }}
                />

                <Button 
                    title="Login"
                    color="success"
                    fill="basic"
                    direction="row_reverse" 
                    expand="default"
                    onClick={submitHandler} 
                    classNames={{
                        container: styles.btnContainer
                    }}
                />

            </form>

            <Modal
                isOpen={isModalOpen}
                setIsOpen={!loading ? setIsModalOpen : console.log}
            >
                <ModeForm 
                    setIsOpen={setIsModalOpen}
                    loading={loading}
                    setLoading={setLoading}
                />
            </Modal>

        </div>
    )
}

export default Login;