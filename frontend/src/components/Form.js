import React, { useRef, useEffect, useState } from "react"
import styled from "styled-components"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"


const FormContainer = styled.form`
    display: flex;
    flex-wrap: wrap;
    gap: 20px; // Aumentei o espaço entre os elementos
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    width: 100%;
    min-width: 500px;
`

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    flex-basis: 200px; // Define uma largura consistente para os campos
    min-width: 150px;
    gap: 5px; // Espaçamento entre o label e o input
`

const Input = styled.input`
    width: 200px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`

const Label = styled.label``

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;
    align-self: flex-end;
    margin-top: auto;
    &:hover {
        background-color: #1a5bb8;
    }
`

const PasswordGeneratorContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: flex-start;
`

const Form = ( { getUsers, onEdit, setOnEdit } ) => {
    const ref = useRef()
    const [generatedPassword, setGeneratedPassword] = useState("")

    useEffect(() => {
        if (onEdit) {
            const user = ref.current

            user.nome.value = onEdit.nome
            user.email.value = onEdit.email
            user.senha.value = onEdit.senha
        }
    }, [onEdit])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const user = ref.current

        if (
            !user.nome.value ||
            !user.email.value ||
            !user.senha.value
        ) {
            return toast.warn("Preencha todos os campos!")
        }

        if (onEdit) {
            await axios
                .put("http://localhost:8800/" + onEdit.id, {
                    nome: user.nome.value,
                    email: user.email.value,
                    senha: user.senha.value
                })
                .then(({data}) => toast.success(data))
                .catch(({ data }) => toast.error(data))
        } else {
            await axios
                .post("http://localhost:8800", {
                    nome: user.nome.value,
                    email: user.email.value,
                    senha: user.senha.value
                })
                .then(({data}) => toast.success(data))
                .catch(({ data }) => toast.error(data))
        }

        user.nome.value = ""
        user.email.value = ""
        user.senha.value = ""

        setOnEdit(null)
        getUsers()
    }

    const handleGeneratePassword = () => {
        const password = Math.random().toString(36).slice(-8)
        setGeneratedPassword(password)
        ref.current.senha.value = password
    }

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Nome: </Label>
                <Input name="nome"/>
            </InputArea>
            <InputArea>
                <Label>E-mail: </Label>
                <Input name="email" type="email"/>
            </InputArea>
            <InputArea>
                <Label>Senha: </Label>
                <Input name="senha"/>
            </InputArea>
            <PasswordGeneratorContainer>
                <Button type="button" onClick={handleGeneratePassword}>Gerar Senha</Button>
            </PasswordGeneratorContainer>
            <Button type="submit">Salvar</Button>
        </FormContainer>
    )
}

export default Form