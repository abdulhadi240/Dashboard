// pages/index.js
import { useEffect } from 'react';
import { generateSHA256, generateTimestamp } from '../../configs/tiktok';
import { useState } from 'react';
export default function Home() {
  const path = '/api/orders/search';
  const appKey = '6b7r8522daq2r';
  const secret = '28e470e1bb4c937b41281c7046edef8552a10402';
  const accessToken = 'TTP_9YL5PQAAAAC7Vga5PPlGWG9yFH-qQilqTuVqoyOTo0qDq8ms8o8w0GAlny2J6nJyRfjfDlECR1MzKM5OzzZv_OoU9jpCer9pXxo10PquRYHtElytXzU68i_7h_mS5nYVrnYG88xNR4kgl64xOMLWXQCaUslW5v5LKwuSPAtuJI1EN1Q8aJgw1g';
  const [time , setTime] = useState('')
  const [sign , setSign] = useState('')

  useEffect(()=>{
    const fetchData = async () => {
        const timestamp = generateTimestamp();
        setTime(timestamp)
        const queries = {
        app_key: appKey,
        timestamp: timestamp.toString(),
      };
      const signature = generateSHA256(path, queries, secret);
      setSign(signature)
        try {
          const response = await fetch(`https://open-api.tiktokglobalshop.com/api/orders/search?app_key=${appKey}&access_token=${accessToken}&sign=${signature}&timestamp=${timestamp}`, {
            method: 'POST',
            
            
            headers: {
              'Content-Type': 'application/json',
              'x-tts-access-token':'TTP_9YL5PQAAAAC7Vga5PPlGWG9yFH-qQilqTuVqoyOTo0qDq8ms8o8w0GAlny2J6nJyRfjfDlECR1MzKM5OzzZv_OoU9jpCer9pXxo10PquRYHtElytXzU68i_7h_mS5nYVrnYG88xNR4kgl64xOMLWXQCaUslW5v5LKwuSPAtuJI1EN1Q8aJgw1g'
            },
            body: JSON.stringify({
              page_size: 100,
            }),
          });
  
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();

  },[sign , time])

  

  


  return (
    <div>
      <p>Timestamp: {time}</p>
      <p>Sign: {sign}</p>
    </div>
  );
}


