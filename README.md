# ShowMyCards

ShowMyCards is a self hosted solution for managing Magic: The Gathering Cards. It supports multiple storage locations, and routing rules to automatically sort cards.

## Building from Source

1. Clone this repository
2. Copy `.env.example` to `.env`
3. Run the following:

```
bun install
bun db:push
bun dev
```

ShowMyCards will be available on http://localhost:3000/ by default.

## Roadmap

- Search (!)
- Storage Rules (!)
- Collection (!)
- Settings
- Deck Support

(!) indicates an item that has been previously completed in an older unreleased version and just needs to be ported across.
