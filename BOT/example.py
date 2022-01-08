import os
def stopComand(comando):
    if os.system('systemctl stop ' + comando) == 0:
        print('Comando ejecutado correctamente')
    else:
        print('ERROR')
   


if __name__ == "__main__":
    comand = input('Servicio a detener: ')
    stopComand(comand)