import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { userForm } from "../../hooks/useForm"
import { setActiveNote } from "../../store/journal/journalSlice"
import { startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal/thunks"
import { ImageGallery } from "../components"
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useRef } from "react"

export const NoteView = () => {

  const dispatch = useDispatch();

  const {active:note, messageSaved, isSaving} = useSelector(state => state.journal);

  const {body, title, date, onInputChange, formState} = userForm(note);

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date])

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState])
  
  const handleSaveNote = () => {
    dispatch(startSaveNote());
  }

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire('Nota Actualizada', messageSaved, 'success');
    }
  }, [messageSaved])

  const onFileInputChange = ({target}) => {
    if (target.files === 0) return;

    dispatch(startUploadingFiles(target.files));
  }

  const fileInputeRef = useRef();

  const handleDelete = () => {
    dispatch( startDeletingNote());
  }

  return (
    <Grid container direction='row' justifyContent='space-between' sx={{mb: 1}}
    className='animate__animated animate__fadeIn animate__faster'>
      <Grid item>
        <Typography fontSize={39} fontWeight='light'>
          {dateString}
        </Typography>
      </Grid>
      <Grid item>

        <input 
          type='file'
          multiple
          ref={fileInputeRef}
          onChange={onFileInputChange}
          style={{display: 'none'}}
        />

        <IconButton 
          color='primary'
          disabled={isSaving}
          onClick={() => fileInputeRef.current.click()}
        >
          <UploadOutlined />
        </IconButton>

        <Button
          disabled={isSaving}
          color='primary' 
          sx={{padding: 2}} 
          onClick={handleSaveNote}
        >
          <SaveOutlined sx={{fontSize: 30, mr: 1}} />
          Guardar
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type='text'
          variant='filled'
          fullWidth
          placeholder="Ingrese un titulo"
          label='Titulo'
          name="title"
          value={title}
          onChange={onInputChange}
          sx={{boder: 'none', mb: 1}}
        />

        <TextField
          type='text'
          variant='filled'
          fullWidth
          multiline
          placeholder="Que sucedio el dia de hoy?"
          name="body"
          value={body}
          onChange={onInputChange}
          minRows={5}
        />
      </Grid>

      <Grid container justifyContent='end'>
        <Button 
          onClick={handleDelete}
          sx={{mt: 2}}
          color='error'
        >
          <DeleteOutline />
          Borrar
        </Button>
      </Grid>

      <ImageGallery 
        images={note.imageUrls}
      />
    </Grid>
  )
}
