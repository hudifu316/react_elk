import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'

const Country = (props) => {
    const { id, options, defaultValue, onChange } = props
    const filter = createFilterOptions()
    const [value, setValue] = useState(defaultValue)
    const handleCountryChange = (value) => {
        setValue(value)
        onChange({ id, "country": value })
    }

    return (
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
                if (newValue && newValue.inputValue) {
                    console.log("add new value: " + newValue.inputValue)
                    // Create a new value from the user input
                    handleCountryChange(newValue.inputValue)
                } else {
                    console.log("set value to: " + newValue)
                    handleCountryChange(newValue)
                }
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params)
                // Suggest the creation of a new value
                if (params.inputValue !== '') {
                    filtered.push({
                        inputValue: params.inputValue,
                        title: `Add "${params.inputValue}"`
                    })
                }
                return filtered
            }}

            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id={"combox-" + id}
            options={options}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                    return option.inputValue
                }
            }}
            renderOption={(option) => {
                if (option.title) { return option.title }
                else { return option }
            }}
            style={{ width: 300 }}
            freeSolo
            renderInput={(params) => (
                <TextField {...params} label="国・地域" margin="normal" />
            )}
        />
    )
}

export default Country