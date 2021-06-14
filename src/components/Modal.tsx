import React from 'react'
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center'
        },
    }),
)

type ModalWindowPropsType = {
    text: string
    open: boolean
    setOpen: (open: boolean) => void
}

const ModalWindow: React.FC<ModalWindowPropsType> = ({text, open, setOpen}) => {
    const classes = useStyles()

    const handleClose = () => {
        setOpen(false)
    }

    const body = (
        <div className={classes.paper}>
            <h2>{text}</h2>
        </div>
    )

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            {body}
        </Modal>
    )
}

export default ModalWindow
