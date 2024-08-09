// import the app module
const app = require('./app');

// import the mongoose module
const mongoose = require('mongoose');

// log the message connecting to the MongoDB
console.log('Connecting to MongoDB...');

// import config module
const config = require('./utils/config');
const song = require('./models/song');

mongoose.connect(config.MONGODB_URI)
  .then(
    () => {
      console.log('Connected to MongoDB');
    //   let songs = [{
    //     "song_name": "Chinnanjiru Nilave",
    //     "album": "Ponniyin Selvan 2 (PS-2)",
    //     "artist": "A.R. Rahman, Haricharan",
    //     "genre": "Melody",
    //     "lang": "Tamil",
    //     "link": "https://isaidl.top/files/Tamil%202023%20Songs/Ponniyin%20Selvan%202%20(PS-2)/Chinnanjiru%20Nilave.mp3",
    //     "image": "https://isaimini.com.ps/uploads/songs/64106-chinnanjiru-nilave-song.webp"
    //   },
    //   {
    //     "song_name": " Aasa Kooda",
    //     "album": "Aasa Kooda",
    //     "artist": "Sai Abhyankkar",
    //     "genre": "Indi pop",
    //     "lang": "Tamil",
    //     "link": "https://isaidl.top/files/Tamil%202024%20Songs/Aasa%20Kooda/Aasa%20Kooda.mp3",
    //     "image": "https://isaimini.com.ps/uploads/songs/67292-aasa-kooda-song.webp"
    //   },
    //   {
    //     "song_name": "Azhagiye",
    //     "album": "Kaatru Veliyidai",
    //     "artist": "Arjun Chandy, Haricharan, Jonita Gandhi",
    //     "genre": "Melody",
    //     "lang": "Tamil",
    //     "link": "https://isaidl.top/files/Tamil%202017%20Songs/Kaatru%20Veliyidai/Azhagiye.mp3",
    //     "image": "https://isaiminisong.com/wp-content/uploads/2022/02/44960.png"
    //   },
    //   {
    //     "song_name": "Pathala Pathala",
    //     "album": " Vikram",
    //     "artist": "Kamal Haasan, Anirudh Ravichander",
    //     "genre": "Folk",
    //     "lang": "Tamil",
    //     "link": "https://isaidl.top/files/Tamil%202022%20Songs/Vikram/Pathala%20Pathala.mp3",
    //     "image": "https://isaimini.com.ps/uploads/songs/63093-pathala-pathala-song.webp"
    //   },
    //   {
    //     "song_name": "Saarattu Vandiyila",
    //     "album": " Kaatru Veliyidai",
    //     "artist": "A. R. Rahman, A. R. Raihanah, Tipu, Nikhita Gandhi",
    //     "genre": "Folk",
    //     "lang": "Tamil",
    //     "link": "https://isaidl.top/files/Tamil%202017%20Songs/Kaatru%20Veliyidai/Saarattu%20Vandiyila.mp3",
    //     "image": "https://isaiminisong.com/wp-content/uploads/2022/02/44960.png"
    //   },
    
    //   {
    //     "song_name": "Chana mera",
    //     "album": " Ae Dil Hai Mushkil ",
    //     "artist": "Pritam, Arijit Singh",
    //     "genre": "Melody",
    //     "lang": "Hindi",
    //     "link": "https://hindi3.djpunjab.app/load-hindi/oVGdCm_6-o7LMut-BCNRFQ==/Channa%20Mereya%20(From%20Ae%20Dil%20Hai%20Mushkil).mp3",
    //     "image": "https://pagalfree.com/images/128Channa%20Mereya%20-%20Ae%20Dil%20Hai%20Mushkil%20128%20Kbps.jpg"
    //   },
    
    //   {
    //     "song_name": "Ishq Wala Love",
    //     "album": "Student Of The Year",
    //     "artist": "Vishal-Shekhar, Shekhar Ravjiani, Salim Merchant, Neeti Mohan",
    //     "genre": "Melody",
    //     "lang": "Hindi",
    //     "link": "https://pagalfree.com/musics/128-Ishq%20Wala%20Love%20-%20Student%20Of%20The%20Year%20128%20Kbps.mp3",
    //     "image": "https://pagalfree.com/images/128Ishq%20Wala%20Love%20-%20Student%20Of%20The%20Year%20128%20Kbps.jpg"
    //   },
    //   {
    //     "song_name": "Tauba Tauba (",
    //     "album": "Bad Newz",
    //     "artist": "Karan Aujla",
    //     "genre": "Melody",
    //     "lang": "Hindi",
    //     "link": "https://www.pagalworld.com.sb/files/download/type/320/id/71542",
    //     "image": "https://www.pagalworld.com.sb/siteuploads/thumb/sft144/71542_4.jpg"
    //   },
    //   {
    //     "song_name": "Naach Meri Rani",
    //     "album": "Stree",
    //     "artist": "Guru Randhawa, Tanishk Bagchi, Nikhita Gandhi",
    //     "genre": "Pop",
    //     "lang": "Hindi",
    //     "link": "https://www.pagalworld.com.sb/files/download/type/320/id/4693",
    //     "image": "https://pagalfree.com/images/128Naach%20Meri%20Rani%20-%20Guru%20Randhawa%20128%20Kbps.jpg"
    //   },
    //   {
    //     "song_name": "Janam Janam",
    //     "album": "Dilwale",
    //     "artist": "Arijit Singh, Antara Mitra, Pritam",
    //     "genre": "Melody",
    //     "lang": "Hindi",
    //     "link": "https://pagalfree.com/musics/128-Janam%20Janam%20-%20Dilwale%20128%20Kbps.mp3",
    //     "image": "https://pagalfree.com/images/128Janam%20Janam%20-%20Dilwale%20128%20Kbps.jpg"
    //   },
    //   {
    //     "song_name": "Sunn Raha Hai",
    //     "album": "Aashiqui 2",
    //     "artist": "Shreya Ghoshal",
    //     "genre": "Melody",
    //     "lang": "Hindi",
    //     "link": "https://pagalfree.com/musics/128-Sunn%20Raha%20Hai%20(Female)%20-%20Aashiqui%202%20128%20Kbps.mp3",
    //     "image": "https://pagalfree.com/images/128Sunn%20Raha%20Hai%20(Female)%20-%20Aashiqui%202%20128%20Kbps.jpg"
    //   },
    
    //   {
    //     "song_name": "lluminati",
    //     "album": "Aavesham",
    //     "artist": "Sushin Shyam, Dabzee",
    //     "genre": "folk",
    //     "lang": "Malayalam",
    //     "link": "https://cdn.jattpendu.com/download/128k-wscuv/Illuminati.mp3",
    //     "image": "https://img.wynk.in/unsafe/248x248/filters:no_upscale():strip_exif():format(webp)/http://s3.ap-south-1.amazonaws.com/wynk-music-cms/srch_hungama/3617384823858_20240514151606/3617384823858/1715681105699/resources/3617384823858.jpg"
    //   },
    //   {
    //     "song_name": "Neela Nilave",
    //     "album": "RDX",
    //     "artist": "Manu Manjith, Neeraj Madhav",
    //     "genre": "Melody",
    //     "lang": "Malayalam",
    //     "link": "https://www.pagalworld.com.so/files/download/type/128/id/15589",
    //     "image": "https://img.wynk.in/unsafe/248x248/filters:no_upscale():strip_exif():format(webp)/http://s3.ap-south-1.amazonaws.com/wynk-music-cms/srch_saregama/20230823205119000/8907212009552/1692807326433/resources/8907212009552.jpg"
    //   },
    //   {
    //     "song_name": "Aluva Puzha",
    //     "album": "Premam",
    //     "artist": "Vineeth Sreenivasan",
    //     "genre": "Melody",
    //     "lang": "Malayalam",
    //     "link": "https://cdn.jattpendu.com/download/128k-arvec/Aluva-Puzha.mp3",
    //     "image": "https://masstamilan.dev/wp/premam-malayalam-2015.webp"
    //   },
    //   {
    //     "song_name": "Palivada Badra Vatakam",
    //     "album": "Be Free",
    //     "artist": "Singer:	Vidya Vox",
    //     "genre": "Traditional fusion",
    //     "lang": "Malayalam",
    //     "link": "https://pagallworld.co.in/wp-content/uploads/2023/06/Palivada-Badra-Vatakam.mp3",
    //     "image": "https://www.pagalworld.com.co/uploads/thumb/sft28/13771_4.jpg"
    //   },
    //   {
    //     "song_name": "Malare",
    //     "album": "Premam",
    //     "artist": "Vijay Yesudas",
    //     "genre": "folk",
    //     "lang": "Malayalam",
    //     "link": "https://cdn.jattpendu.com/download/128k-aucvk/Malare.mp3",
    //     "image": "https://masstamilan.dev/wp/premam-malayalam-2015.webp"
    //   },
    //   {
    //     "song_name": "Buttabomma",
    //     "album": "Ala Vaikunthapurramuloo",
    //     "artist": "Armaan Malik",
    //     "genre": "folk",
    //     "lang": "Telugu",
    //     "link": "https://dl1.jattpendu.com/download/320k-dkkey/Buttabomma.mp3",
    //     "image": "https://masstamilan.dev/i/wp/ala-vaikunthapurramuloo-2020.webp"
    //   },
    //   {
    //     "song_name": "Andham Ammai Ante",
    //     "album": "Hushaaru",
    //     "artist": "Sid Sriram",
    //     "genre": "folk",
    //     "lang": "Telugu",
    //     "link": "https://pagallworld.co.in/wp-content/uploads/2023/04/Andham-Ammai-Ante.mp3",
    //     "image": "https://masstamilan.dev/i/wp/hushaaru-2018.webp"
    //   },
    //   {
    //     "song_name": "Buttabomma",
    //     "album": "Ala Vaikunthapurramuloo",
    //     "artist": "Armaan Malik",
    //     "genre": "folk",
    //     "lang": "Telugu",
    //     "link": "https://dl1.jattpendu.com/download/320k-dkker/Ramuloo-Ramulaa.mp3",
    //     "image": "https://masstamilan.dev/i/wp/ala-vaikunthapurramuloo-2020.webp"
    //   },
    //   {
    //     "song_name": "Thattukolede",
    //     "album": "Thattukolede",
    //     "artist": "Vijai Bulganin",
    //     "genre": "Melody",
    //     "lang": "Telugu",
    //     "link": "https://cdn.jattpendu.com/download/128k-dmjky/Thattukolede.mp3",
    //     "image": "https://cdn.jattpendu.com/thumbmed/27434725.jpg"
    //   },
    //   {
    //     "song_name": "Samajavaragamana ",
    //     "album": "Ala Vaikunthapurramuloo",
    //     "artist": "Sid Sriram",
    //     "genre": "Melody",
    //     "lang": "Telugu",
    //     "link": "https://dl1.jattpendu.com/download/320k-dkkee/Samajavaragamana---Male.mp3",
    //     "image": "https://masstamilan.dev/i/wp/ala-vaikunthapurramuloo-2020.webp"
    //   },
    //   {
    //     "song_name": "La Isla Bonitas",
    //     "album": "a Isla Bonita ",
    //     "artist": "Hr. Troels",
    //     "genre": "pop",
    //     "lang": "English",
    //     "link": "//www.pagalworld.com.so/files/download/type/320/id/23014",
    //     "image": "//www.pagalworld.com.so/uploads/thumb/sft47/23014_4.jpg"
    //   },
    //   {
    //     "song_name": "Marshmello Alone",
    //     "album": "Marshmello",
    //     "artist": "	Marshmello",
    //     "genre": "pop",
    //     "lang": "English",
    //     "link": "https://www.pagalworld.com.so/files/download/type/320/id/20474",
    //     "image": "https://www.pagalworld.com.so/uploads/thumb/sft41/20474_4.jpg"
    //   },
    //   {
    //     "song_name": "Eerie",
    //     "album": "Eerie",
    //     "artist": "Nora Jehoul",
    //     "genre": "pop",
    //     "lang": "English",
    //     "link": "https://www.pagalworld.com.so/files/download/type/320/id/7210",
    //     "image": "https://www.pagalworld.com.so/uploads/thumb/sft15/7210_4.jpg"
    //   },
    //   {
    //     "song_name": "Heartbeat",
    //     "album": "Heartbeat ",
    //     "artist": "KSHMR",
    //     "genre": "pop",
    //     "lang": "English",
    //     "link": "https://www.pagalworld.com.so/files/download/type/320/id/14540",
    //     "image": "https://www.pagalworld.com.so/uploads/thumb/sft30/14540_4.jpg"
    //   },
    //   {
    //     "song_name": "Baby Calm Dow",
    //     "album": "Baby Calm Dow",
    //     "artist": "Rema",
    //     "genre": "pop",
    //     "lang": "English",
    //     "link": "https://www.pagalworld.com.so/files/download/type/320/id/12411",
    //     "image": "https://www.pagalworld.com.so/uploads/thumb/sft25/12411_4.jpg"
    //   },
    
    // ]
    //   song.insertMany(songs)
    //   // start the server
      app.listen(3001, () => {
        console.log('Server is running on http://localhost:3001');
      });
    }
  )
  .catch((error) => {
    console.error('Error connecting to MongoDB: ', error.message);
  });