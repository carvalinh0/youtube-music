from pypresence import Presence
from pypresence.types import ActivityType, StatusDisplayType
import time

RPC = Presence("1437232956065190095")
RPC.connect()

start = int(time.time())
end = int(time.time()+600)

class DiscordRPC:
    def __init__(self, client_id):
        self.id = client_id
        self.state = False
        self.start = None
        self.end = None
        self.music_name = None
        self.artist = None
        self.default_image = "icon.png"
        self.image_url = None or self.default_image

    def update_state(self, music_name, artist, image_url, music_time):
        self.state = True
        self.start = int(time.time())
        self.end = start + music_time
        self.music_name = music_name
        self.artist = artist
        self.image_url = image_url or self.default_image

    def initialize(self, name="Youtube Music", status_display=StatusDisplayType.STATE, activity_type=ActivityType.LISTENING):
        while self.state:
            try:
                RPC.update(
                    name=name,
                    status_display_type=status_display,
                    state=self.artist,
                    details=self.music_name,
                    large_image=self.image_url,
                    activity_type=activity_type,
                    start=self.start,
                    end=self.end
                )
            except Exception as e:
                print(f"Error updating RPC: {e}")

            time.sleep(1)

    def stop(self):
        self.state = False



