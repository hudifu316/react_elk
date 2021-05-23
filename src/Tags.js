import React from 'react'
import Chip from '@material-ui/core/Chip'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}))

const Tags = (props) => {
  const { id, options, onChange } = props
  const classes = useStyles()

  const handleTagsChange = (value) => {
    onChange({ id, "tag": value })
  }

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id={"tags" + id}
        options={options}
        defaultValue={options}
        freeSolo
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField {...params} variant="filled" label="タグ付け" placeholder="関連するタグ" />
        )}
        onChange={(e, newValue) => handleTagsChange(newValue)}
      />
    </div>
  )
}

export default Tags