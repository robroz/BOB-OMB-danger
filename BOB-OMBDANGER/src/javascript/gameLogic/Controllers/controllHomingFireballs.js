//scoreThreshold = score at wich fireballs gets given properties. spawnRate = amount of fireballs that spawn in seconds. 


const homingFireballControlls = [ 
    { scoreThreshold: 0, spawnRate: 0.99, Speed:1.5, homingTime: 4, homingSpeed: 0.03, Radius:10,blastradius:300, explosionDuration: 0.4,  Color: "#1822ed", customEffects: "null"},
    { scoreThreshold: 1, spawnRate: 0, Speed:0.5, homingTime: 3, homingSpeed: 0.13, Radius:20,blastradius:30, Color: "#1822ed", customEffects: "null"},
    { scoreThreshold: 7, spawnRate: 1, Speed:1.6, homingTime: 1.3, homingSpeed: 0.01, Radius:15,blastradius:200, explosionDuration: 0.2, Color: "#1822ed", customEffects: "null"},
    { scoreThreshold: 15, spawnRate: 0, Speed:2, homingTime: 0.9, homingSpeed: 0.01, Radius:15,blastradius:200, explosionDuration: 0.1, Color: "#1822ed", customEffects: "null"},
    { scoreThreshold: 20, spawnRate: 0.4, Speed:0.5, homingTime: 6, homingSpeed: 0.13, Radius:6,blastradius:1000, explosionDuration: 8, Color: "#1822ed", customEffects: "null"},
    { scoreThreshold: 21, spawnRate: 0, Speed:0.5, homingTime: 3, homingSpeed: 0.13, Radius:20,blastradius:30, Color: "#1822ed", customEffects: "null"},
 
  ];
  
export  function homingFireballControll(score) {
    // Loop through the fireballControlls array to find the correct controlls based on the score
    for (let i = homingFireballControlls.length - 1; i >= 0; i--) {
      if (score >= homingFireballControlls[i].scoreThreshold) {
        return homingFireballControlls[i];
      }
    }
  }