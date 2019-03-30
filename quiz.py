from cryptography.fernet import Fernet

key = 'TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM='

# Oh no! The code is going over the edge! What are you going to do?
message = b'gAAAAABcnOz18xKSaqxPmMyDA_cJfCYGjkaMY-krEBLqEbvWHMOz8AIE4S7Jjg9dJXcskkWmdUhgSBMM6WvrK3FqopGJjyNd75Eu4j6wp6v1LGXtPYh2pVWM0m8ie5XEaM4S87DoErvHbUY0__eC-JViTYXGRM5dNHb2Xt_eoacxWNOX4BTBmm8WfLJLuzSvWrL-93oaSZA4'

def main():
    f = Fernet(key)
    print(f.decrypt(message))


if __name__ == "__main__":
    main()