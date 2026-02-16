# 🚢 Battleship

A browser-based implementation of the classic Battleship game built with JavaScript, following object-oriented design principles and test-driven development.

This project was originally based on The Odin Project requirements and expanded with additional gameplay and UI enhancements.

---

## ✅ Core Requirements Implemented

- Ship class with:
  - `length`
  - `hit()` method
  - `isSunk()` method
- Gameboard class with:
  - Ship placement at coordinates
  - `receiveAttack()` handling hits and misses
  - Tracking of missed attacks
  - Detection of game-over condition
- Player class:
  - Real and computer players
  - Each player owns their own Gameboard
- Turn-based game flow
- Random move generation for computer player
- Game ends when all ships of one player are sunk

---

# 🚀 Extended Features

## 🎯 Persistent Combat Log

- Dynamic message display for:
  - Hits
  - Misses
  - Sunk ships
  - Turn changes
  - Setup instructions
- Messages persist to clearly communicate game flow.
- Improves UX and player feedback.

---

## 🛳 Fleet Status Display

- Visual display of:
  - Player ships
  - Enemy ships
- Ships clearly show:
  - Current hit status
  - Sunk state
- Provides real-time strategic awareness.

---

## 🖱 Drag-and-Drop Ship Placement

- Ships are placed using mouse drag interaction.
- Live preview while dragging:
  - Direction auto-detected based on drag movement.
  - Preview dynamically updates as cursor moves.
  - Placement snaps to dominant axis (horizontal/vertical).
- Final placement confirmed on mouse release.
- Replaces manual coordinate entry with intuitive UI behavior.

---

## 🤖 Smarter Computer AI

- Computer tracks successful hits.
- If a hit does **not** sink a ship:
  - AI prioritizes adjacent coordinates.
- Prevents repeated attacks on the same coordinate.
- Produces more strategic and realistic gameplay compared to purely random attacks.

---

## 🧠 Architecture & Design

- Clear separation of concerns:
  - Game logic (Ship, Gameboard, Player)
  - Game controller module
  - DOM rendering module
- Core game logic is independent of the DOM.
- UI strictly reflects object state.
- Designed to be testable without relying on console logs or UI checks.

---

## 🏁 Game Flow

1. Player places ships via drag-and-drop.
2. Turns alternate between player and computer.
3. Attacks update board state and combat log.
4. Game ends when all ships of one fleet are sunk.

---

## 🔮 Possible Future Improvements

- Enhanced AI targeting strategy
- Animations for hits and sinks
- 2-player local mode

