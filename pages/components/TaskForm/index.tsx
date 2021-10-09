import { useFormik } from 'formik'
import { useState } from 'react'
import { openTaskManagerDB } from '../../data/database'

export type Interval = 'daily' | 'weekly' | 'monthly' | undefined
export type TaskFormErrors = {
    label?: string
    startDate?: string
    interval?: string
}

const TaskForm = () => {

    const [ success, setSuccess ] = useState(false)
    const validate = values => {
        const errors: TaskFormErrors = {};
        const { label, startDate, interval } = values

        if (!label) {
          errors.label = 'Required';
        } else if (values.label.length > 15) {
          errors.label = 'Must be 15 characters or less';
        }
      
        if (!startDate) {
          errors.startDate = 'Required';
        } 
      
        if (!interval) {
          errors.interval = 'Required';
        } else if (interval !== 'daily' && interval !==  'weekly' && interval !== 'monthly') {
          errors.interval = 'Invalid interval';
        }

        if(!!errors.interval || !!errors.startDate || !!errors.label)
          setSuccess(false)
        
        return errors;
      }

    const formik = useFormik({
        initialValues: {
          label: undefined,
          startDate: new Date().toISOString().substring(0,10),
          interval: 'daily',
        },
        validate,
        onSubmit: values => {
          const { label } = values
          // Add to local storage
          localStorage.setItem(`task;${label}`, JSON.stringify(values))
          // Add to IndexedDB
          const DBOpenRequest = openTaskManagerDB()

          DBOpenRequest.onsuccess = function(event) {
            const db = DBOpenRequest.result;
            addData(db)
          }

          const addData = (db) => {
            var tasksObjectStore = db.transaction("tasks", "readwrite").objectStore("tasks")
            const objectStoreRequest = tasksObjectStore.add(values);
            objectStoreRequest.onsuccess = function(event) {
              // update state success
              setSuccess(true)
            }
          }
        },
      })

      return (
        <form onSubmit={formik.handleSubmit}>
          <div style={{display:'flex', flexDirection:'column', marginLeft:'2rem', marginRight:'2rem'}}>
            <label htmlFor="label">Label</label>
            <input
                id="label"
                name="label"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.label}
            />
            <div style={{color:'red'}}>{formik.errors.label}</div>

            <label htmlFor="startDate">Start Date</label>
            <input
                id="startDate"
                name="startDate"
                type="date"
                onChange={formik.handleChange}
                value={formik.values.startDate}
            />
            <div style={{color:'red'}}>{formik.errors.startDate}</div>

            <label htmlFor="interval">Interval</label>
            <select name="interval" onChange={formik.handleChange}>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
            </select>
            <div style={{color:'red'}}>{formik.errors.interval}</div>

            <br/>

            <button type="submit" disabled={!formik.isValid} >Valider</button>

            {(formik.submitCount > 0 && success) ? <div style={{color:'green'}}>The task was created successfully </div> : null}
          </div>
        </form>
      );
}

export default TaskForm