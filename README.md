1. npm i
2. hapus folder migration, model
3. buat database "database_test"
4. migrsi menggunakan sequelize
    npx sequelize-cli init
   ganti "database": "database_development" menjadi "database": "database_test",
    ketikan berikut di cli: npx sequelize-cli model:generate --name Product --attributes namaBarang:string,stok:integer,jumlahTerjual:integer,tanggalTransaksi:string,jenisBarang:string
   lalu npx sequelize-cli db:migrate
