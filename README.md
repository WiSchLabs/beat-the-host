![](src/assets/BeatTheHost.png)

# Beat the Host
This is a Vue3-based game inspired by [Schlag den Raab](https://en.wikipedia.org/wiki/Schlag_den_Raab).

## Customize configuration
Then you would need to add all the challenges you want to be available to the game in `data/challenges.json`.

You would also need to adjust the names of the players in `data/players.json`.

### Game Settings
The overall game settings can be adjusted in `data/settings.json`.

| name                       | default | description                                                                                                            |
|----------------------------|---------|------------------------------------------------------------------------------------------------------------------------|
| `numberOfChallengesToPlay` | 15      | Number of challenges to be played in a game                                                                            |
| `randomizeChallenges`      | true    | Whether to select the next challenge at random (or using fixed order)                                                  |
| `language`                 | en      | Which language to use for the game interface. This does not affect the content of the challenges. Defaults to English. |

## Project Setup
```sh
npm install
```

### Compile and Hot-Reload for Development
```sh
npm run dev
```

### Compile and Minify for Production
```sh
npm run build
```
