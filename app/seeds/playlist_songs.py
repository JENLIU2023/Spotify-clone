from app.models import db, Playlist_Song, environment, SCHEMA
from sqlalchemy.sql import text

def seed_playlist_songs():
    list1 = Playlist_Song(
        playlistId=1,
        songId=1,
    )
    list2 = Playlist_Song(
        playlistId=1,
        songId=2,
    )
    list3 = Playlist_Song(
        playlistId=1,
        songId=3,
    )
    list4 = Playlist_Song(
        playlistId=2,
        songId=6,
    )
    list5 = Playlist_Song(
        playlistId=3,
        songId=9,
    )

    lists = [list1, list2, list3, list4, list5]
    _ = [db.session.add(list) for list in lists]
    db.session.commit()

def undo_playlist_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlist_songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlist_songs"))

    db.session.commit()