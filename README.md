run api, engine etc from respective folders not from src as nodemon will track file changes and restart

start engine with WITH_SNAPSHOT=true nodemon src/index.ts --ignore 'trade/snapshot.json'
