import { AddOutlined } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startNewNote } from "../../store/journal/thunks"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../views"

export const JournalPage = () => {

  const dispatch = useDispatch();

  const {isSaving, active} = useSelector(state => state.journal);
  //const isSavingNewNote = useMemo(() => isSaving, [isSaving]);

  const handleNewNote = () => {
    dispatch(startNewNote());
  }

  return (
    <JournalLayout>

      {
        (!!active)
          ?<NoteView />
          :<NothingSelectedView />
      }
      
      <IconButton
        disabled={isSaving}
        onClick={handleNewNote}
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ":hover": {backgroundColor: 'error.main', opacity: 0.9},
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{fontSize: 30}}/>
      </IconButton>
    </JournalLayout>
  )
}
