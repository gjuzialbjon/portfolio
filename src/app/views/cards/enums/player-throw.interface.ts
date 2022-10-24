import { Players } from "@app/core/enums/players";
import { Card } from "@app/core/models/card";

export interface PlayerThrow {
  player: number,
  cards: Card[],
  turn: Players,
  lastPlayed: Players,
  cardsOnTable: Card[]
}