


const reservaMercadoPago = async (datosReserva) => {
    try {
        const respuesta = await fetch('https://backendbarberia-513e27855d49.herokuapp.com/api/reservar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosReserva)
        })
        if(!respuesta.ok){
            throw new Error ('Error al realizar la reserva')
        }
        return await respuesta.json()
    } catch (error) {
        console.log(error)
    }
}


export default reservaMercadoPago