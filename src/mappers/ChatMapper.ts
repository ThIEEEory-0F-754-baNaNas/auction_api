export class ChatMapper {
  getChat(c) {
    return {
      id: c.id,
      messages: c.messages.map((m) => ({
        id: m.id,
        text: m.text,
        createdAt: m.createdAt,
        user: {
          id: m.user.id,
          username: m.user.username,
          avatar: m.user.avatar,
        },
      })),
    };
  }
}
