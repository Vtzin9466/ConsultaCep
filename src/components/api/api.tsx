"use client"

import { useState } from 'react'
import Style from './api.module.css'

interface EnderecoViaCep {
    cep: string
    bairro: string
    localidade: string
    uf: string
    ddd: string
    erro?: boolean
}

const formatarCep = (valor: string): string => {
    const numeros = valor.replace(/\D/g, '')
    if (numeros.length <= 5) return numeros
    return `${numeros.slice(0, 5)}-${numeros.slice(5, 8)}`
}

const buscarEndereco = async (
    cep: string
): Promise<EnderecoViaCep> => {
    const cepLimpo = cep.replace(/\D/g, '')

    if (cepLimpo.length !== 8) {
        throw new Error('CEP deve ter 8 dígitos')
    }

    const res = await fetch(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
    )

    if (!res.ok) {
        throw new Error('Erro ao consultar o serviço de CEP')
    }

    const data: EnderecoViaCep = await res.json()

    if (data.erro) {
        throw new Error('CEP não encontrado')
    }

    return data
}

export default function BuscadorCep() {
    const [cep, setCep] = useState<string>('')
    const [dados, setDados] = useState<EnderecoViaCep | null>(null)
    const [erro, setErro] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setCep(formatarCep(e.target.value))
    }

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>
    ): void => {
        if (e.key === 'Enter') handleBuscar()
    }

    const handleBuscar = async (): Promise<void> => {
        setLoading(true)
        setErro(null)
        setDados(null)
        try {
            const endereco = await buscarEndereco(cep)
            setDados(endereco)
        } catch (e: unknown) {
            if (e instanceof Error) {
                setErro(e.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={Style.div}>
            <input
                type="text"
                value={cep}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Ex: 01310-100"
                maxLength={9}
            />
            <button onClick={handleBuscar} disabled={loading}>
                {loading ? 'Buscando...' : 'Buscar'}
            </button>

            {erro && <p>{erro}</p>}

            {dados && (
                <div>
                    <p>CEP: {dados.cep}</p>
                    <p>Bairro: {dados.bairro || '—'}</p>
                    <p>Cidade: {dados.localidade} - {dados.uf}</p>
                    <p>DDD: {dados.ddd}</p>
                </div>
            )}
        </div>
    )
}