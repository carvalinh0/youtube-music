from window import Window
from discordRPC import DiscordRPC

client_id = "1437232956065190095"
rpc = DiscordRPC(client_id)

def main():
    rpc.connect()
    Window(1280, 720).initialize("https://music.youtube.com/", debug=False, rpc=rpc)

if __name__ == "__main__":
    main()