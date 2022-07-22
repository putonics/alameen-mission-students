import * as React from 'react'
import style from '../../common/style'
import assets from '../../assets'
import { useStudent } from '../../common/redux/classes/students/Student'
import Button from '../../common/components/Button'
import { APIURL } from '../../common/redux/classes/Constants'
import { jsPDF } from "jspdf";
export const avatarPath = (imageName = '') => `/avatars/${imageName}.jpg`
export const imagePath = (imageName = '') => `/documents/${imageName}.jpg`

/**
 * @param {{image: {title: string, name: string}}} props 
 */
const ImageCard = props => {
    const [url, setUrl] = React.useState(assets.logo)
    const student = useStudent()
    React.useEffect(() => {
        if (student && student.docref) {
            setUrl(`${APIURL}/avatars/${student.regno}_${props.image.name}.jpg?${student.modifiedon}`)
        }
    }, [student])

    const [busy, setBusy] = React.useState(false)

    const download = () => {
        setBusy(true)
        var pdf = new jsPDF("p", "mm", "a4");
        var width = pdf.internal.pageSize.getWidth();
        var height = pdf.internal.pageSize.getHeight();
        var img = new Image;
        img.onload = function () {
            if (props.image.title.endsWith('PHOTO')) {
                pdf.addImage(this, 'JPEG', 0, 0);
            } else {
                pdf.addImage(this, 'JPEG', 0, 0, width, height);
            }
            pdf.save(`${props.image.title}.pdf`);
            setBusy(false)
        };
        img.onerror = function () {
            setBusy(false)
        };
        img.crossOrigin = "";
        img.src = `${APIURL}/documents/${student.regno}_${props.image.name}.jpg?${student.modifiedon}`;
    }

    return (
        <div className={style('flex flex-col p-6').card().centerContent().add(url === assets.logo ? 'opacity-30' : '')}>
            <img
                className={`w-40 ${url === assets.logo ? 'blur' : ''}`}
                src={url}
                alt={props.image.title}
                onError={() => setUrl(assets.logo)}
            />
            <div >
                {props.image.title}
            </div>
            <Button
                busy={busy}
                disabled={url === assets.logo}
                onClick={download}
            >
                Download
            </Button>
        </div>
    )
}

export default ImageCard