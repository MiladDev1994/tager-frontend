
import { useEffect, useState } from "react";
import CustomInput from "../../Components/Common/CustomInput/CustomInput";
import styles from "./ModeForm.module.scss"
import Button from "../../Components/Common/Button/Button";
import toast from "react-hot-toast";
import axios from "axios";
import { useRecoilState } from "recoil";
import { AllRecordLength, DirectoryState } from "../../Components/Recoil/Atoms";

const ModeForm = ({
    setIsOpen,
    loading,
    setLoading,
}: {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}) => {

    const [baseUrl, setBaseUrl] = useState("")
    const [mode, setMode] = useState("")
    const [directory, setDirectory] = useRecoilState(DirectoryState);
    const [allRecordLength, setAllRecordLength] = useRecoilState(AllRecordLength);

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        axios.put(`${process.env.REACT_APP_BASE_URL}/config/update`, {
            baseUrl: baseUrl, 
            mode: mode,
        })
        .then(res => {
            setAllRecordLength(res.data.allRecordsLength)
            setDirectory({
                path: res.data.baseDirectory,
                mode: res.data.mode
            })
            setLoading(false)
            setIsOpen(false)
            toast.success("Successful :)", {
                style: {
                    padding: '10px',
                    color: 'white',
                    backgroundColor: "green",
                },
                iconTheme: {
                    primary: 'white',
                    secondary: "green",
                },
            });
        })
        .catch(error => {
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

    const getConfigData = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/config`)
        .then(res => {
            setBaseUrl(res.data.baseDirectory);
            setMode(res.data.mode);
        })
        .catch(() => {
            toast.error("Server Error!!!", {
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
        getConfigData();
    } , [])

    return (
        <form className={styles.formContainer} onSubmit={submitHandler}>
            <CustomInput
                label="Route"
                value={baseUrl} 
                onChange={(e) => setBaseUrl(e)} 
                inputProps={{
                    placeholder: "Enter Directory",
                }}
                classNames={{
                    container: styles.containerBox,
                    inputContainer: styles.inputContainer,
                    label: styles.label,
                    input: styles.input,
                }}
            />

            <div className={styles.selectBox}>
                <label style={{display: "block", marginTop: "20px"}}>Mode</label>
                <select className={styles.ModeSelect} onChange={(e: any) => setMode(e.target.value)} value={mode}>
                    <option value="folder">Folder</option>
                    <option value="file">File</option>
                </select>
            </div>

            <Button
                title={loading ? "Loading..." : "Create"}
                color="success"
                fill="basic"
                direction="row_reverse" 
                expand="default"
                onClick={submitHandler} 
                disabled={loading}
                classNames={{
                    container: styles.btnContainer
                }}
            />
        </form>
    )
}


export default ModeForm;