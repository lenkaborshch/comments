import {useFormik} from 'formik'
import React, {useState} from 'react'
import {Box, Button, TextField} from '@material-ui/core'
import {createStyles, makeStyles} from '@material-ui/core/styles'

import {API} from '../api/api'
import ModalWindow from './Modal'

const useStyles = makeStyles(() =>
    createStyles({
        formSearch: {
            padding: '30px',
            textAlign: 'center',
        },
        containerForm: {
            display: 'flex',
            flexDirection: 'column'
        },
        inputFormSearch: {
            margin: '15px 0 0 0'
        },
        errorMessage: {
            color: 'red',
            textAlign: 'left',
            fontSize: '14px',
            padding: '5px 0'
        },
        btn: {
            margin: '30px 0 0 0'
        }
    })
)

const AddCommentForm = () => {
    const classes = useStyles()
    const [openModal, setOpenModal] = useState(false)
    const formik = useFormik({
        initialValues: {
            name: '',
            text: ''
        },
        onSubmit: async (values) => {
            try {
                await API.sendComment(values.name, values.text)
                formik.resetForm()
                setOpenModal(true)
            } catch (e) {
                console.log(e)
            } finally {

            }
        },
        validate: (values) => {
            const errors: any = {}

            if (!values.name) {
                errors.name = 'Required field'
            }
            if (!values.text) {
                errors.text = 'Required field'
            }

            return errors
        }
    })

    return (
        <>
            <form onSubmit={formik.handleSubmit} className={classes.formSearch}>
                <Box className={classes.containerForm}>
                    <TextField label="Name" placeholder="Name" {...formik.getFieldProps('name')}
                               onChange={formik.handleChange} value={formik.values.name}
                               className={classes.inputFormSearch} required={true}/>
                    {formik.errors.name && formik.touched.name &&
                    <div className={classes.errorMessage}>{formik.errors.name}</div>}

                    <TextField label="Text" placeholder="Write your comment..." {...formik.getFieldProps('text')}
                               onChange={formik.handleChange} value={formik.values.text}
                               className={classes.inputFormSearch} required={true}/>
                    {formik.errors.text && formik.touched.text &&
                    <div className={classes.errorMessage}>{formik.errors.text}</div>}

                    <Button type="submit" disabled={!formik.values.name || !formik.values.text}
                            variant="contained" color="primary" className={classes.btn}>Add comment</Button>
                </Box>
            </form>
            <ModalWindow text="Your comment has been sent" open={openModal} setOpen={setOpenModal}/>
        </>
    )
}

export default AddCommentForm