import React from 'react'
import { useSearchParams } from 'react-router-dom'

function Verify() {

    const [searchParams, setSearchParams] = useSearchParams()
    console.log(window.location.href);
    console.log(searchParams)
    const success = searchParams.get('success')
    const courseIds = searchParams.get('courseIds').split(",")
    console.log(success)
    console.log(courseIds)

    const onClick = async () => {
        const verificationResponse = await fetch("http://localhost:8000/api/v1/users/verify-payment", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzY5ODcyMzBmMWJlZWU5NjdiMWUxNDMiLCJ1c2VybmFtZSI6InNpZGRlc2g5MyIsImVtYWlsIjoic2lkZGVzaHBhbnNhcmU5M0BnbWFpbC5jb20iLCJyb2xlIjoiaW5zdHJ1Y3RvciIsImlhdCI6MTczNTM4OTI1MCwiZXhwIjoxNzM1NDc1NjUwfQ.-HEnKt1329cTiNldxFP3_hL2wrkAjCZ0fegI_Kcx4Hs'
            },
            body : JSON.stringify({
                success,
                courseIds
            })
            })
            const data = await verificationResponse.json()
            console.log(data)
            
    }
    return (
        <div>
            <h1>Success</h1>
            <p>Payment successful</p>
            <button onClick={onClick}>Proceed further</button>
        </div>
    )
}

export default Verify