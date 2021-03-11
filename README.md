# Caesar-Cipher

A little implementation of the Caesar Cipher made for a college activity.

## How to run

After clone this repository, go to the project folder and install the dependencies (using npm or yarn):

```bash
npm install
```

So on, you can install the CLI globally:

```bash
npm link
```

## Usage

If you installed the CLI globally, you can do the following commands:

```bash
caesar-cipher encrypt <text> <offset>
```

```bash
caesar-cipher decrypt <text> <offset>
```

> Text and offset are optional parameters

But if you haven't installed the CLI globally, just execute through Node:

```bash
node index.js encrypt <text> <offset>
```

In addition, you can save messages that have passed through the program, by using `--save` flag and retrieve them using the following command:

```bash
caesar-cipher historic
```

## Help

To know all the commands that can be executed in the CLI, just execute the following command in the terminal:

```bash
caesar-cipher --help
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
