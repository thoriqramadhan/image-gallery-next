export function FormatDate(dateData) {
        const date = new Date(dateString);
        
        // Mendapatkan hari, bulan, dan tahun
        const day = String(date.getDate()).padStart(2, '0'); // Dapatkan hari (DD)
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Dapatkan bulan (MM), bulan di JavaScript berbasis 0
        const year = String(date.getFullYear()).slice(2); // Dapatkan 2 digit terakhir dari tahun (YY)
      
        return `${day}:${month}:${year}`
}