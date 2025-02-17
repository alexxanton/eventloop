const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://gmqdrynqpadkgrfjykkr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtcWRyeW5xcGFka2dyZmp5a2tyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4MzQ0NTIsImV4cCI6MjA1NDQxMDQ1Mn0.8nAq7kURwaDQiCNu_vYk3YgCP5DB8nezsumxSmPcnB4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function getData() {
    /*ejemplo query*/
  const { data, error } = await supabase
  .from ('events')
  .select('*');
 
      
  /*  SELECT *
    FROM auth.users;*/


  if (error) {
    console.error('Error al obtener datos:', error);
  } else {
    console.log('Datos obtenidos:', data);
    console.log(data[0])
  }
}

getData();
