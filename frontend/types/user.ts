export type User = {
  id: string;
  username: string;
  name: string;
  position: Position;
};

enum Position {
  USER,
  AUDITOR,
  ADMIN,
}
