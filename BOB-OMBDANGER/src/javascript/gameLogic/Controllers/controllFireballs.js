//scoreThreshold = score at wich fireballs gets given properties. spawnRate = amount of fireballs that spawn in seconds. 
const fireballControlls = [ 
    { scoreThreshold: 0, spawnRate: 1, Speed:1, Radius:10, Color: "#000", customEffects: "null"},
    { scoreThreshold: 5, spawnRate: 0, Speed:1, Radius:10,Color: "#000", customEffects: "null"},
    { scoreThreshold: 10, spawnRate: 10, Speed:3, Radius:10, Color: "#000", customEffects: "null"},
    { scoreThreshold: 12, spawnRate: 0, Speed:6, Radius:10, Color: "#000", customEffects: "null"},
    { scoreThreshold: 14, spawnRate: 1, Speed:5, Radius:300, Color: "#000", customEffects: "null"},
    { scoreThreshold: 15, spawnRate: 4, Speed:4, Radius:10, Color: "#000", customEffects: "null"},
    { scoreThreshold: 18, spawnRate: 12, Speed:2, Radius:11, Color: "#000", customEffects: "null"},
    { scoreThreshold: 22, spawnRate: 14, Speed:2, Radius:9, Color: "#000", customEffects: "null"},
    { scoreThreshold: 25, spawnRate: 16, Speed:1.8, Radius:7, Color: "#000", customEffects: "null"},
    { scoreThreshold: 27, spawnRate: 150, Speed:0.7, Radius:100, Color: '#000', customEffects: "randomColor"},
  ];
  
export  function fireballControll(score) {
    // Loop through the fireballControlls array to find the correct controlls based on the score
    for (let i = fireballControlls.length - 1; i >= 0; i--) {
      if (score >= fireballControlls[i].scoreThreshold) {
        return fireballControlls[i];
      }
    }
  }
  