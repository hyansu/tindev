import React, {useState} from 'react'
import './Login.css'
import api from '../services/api'
import Logo from '../assets/logo.svg'

export default function Login({history}){

    const [username, setUsername] = useState('')

    async function handleSubmit(e){

        e.preventDefault();
        
        const result = await api.post('/devs', {username})
        const {_id} = result.data

        console.log(result.data)

        history.push(`/dev/${_id}`)

    }

    return(
        <div className="login-container">

            <form onSubmit={handleSubmit}>
                <img src={Logo} alt="Tindev" />
                <input type="text" placeholder="Entre com o seu Github" value={username} onChange={
                    e => { setUsername(e.target.value)}
                    }/>
                <button type="submit">Entrar</button>
            </form>           

        </div>        
    )
}