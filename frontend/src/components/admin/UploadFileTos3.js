import { useState } from "react"
import { baseUrl } from "../../config";

export const UploadFileTos3 = ({ setIsopen }) => {
    const [file, setFile] = useState(null);

    const handleChange = (file) => {
      setFile(file);
    }

    return(
        <div> 
            <input type="file" placeholder="select a file" onChange={(e) => handleChange(e?.target.files?.[0])} />
            <button onClick={async () => {
                if (!file) return;
                try{
                    const res = await fetch(baseUrl + `/generate-upload-url?filename=${file.name}&filetype=${file.type}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        credentials: "include"
                    });
                    const { url } = await res.json()
                    if (res.status === 200) {
                        await fetch(url, {
                            method: "PUT",
                            headers: {
                                "Content-Type": file.type
                            },
                            body: file
                        })
                    }
                } catch (e) {
                    console.log(e);
                }
            }} className="text-red-500">upload to s3</button>
        </div>
    )
}