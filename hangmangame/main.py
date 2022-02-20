from getpass import getpass
import string

alpha = string.ascii_lowercase+string.ascii_uppercase
running = True
errors = 0
total_points = 0
globalrunning = True
errors_tab = [[""]]*8

def getter():
    chosen = getpass(prompt="Your friend chose a word > ")
    if len(chosen) == 0:
        raise "001"
    for elt in chosen:
        if not elt in alpha:
            raise Exception("002")
        elif elt == " ":
            raise Exception("003")
    return chosen

def msg(message):
    print()
    print("======================================")
    print(message)
    print("======================================")
    print()

def ending():
    q = input("Want to start a new game ? (y or n)").lower()
    n = 0
    if q == "y":
        print()
        print("New game starts.")
        n = 1
    elif q == "n":
        print()
        print("Okey, thanks for playing the game ! :D")
        n = 0
    else:
        print()
        print("Answer either y or n. No other values accepted (not case sensitive)")
    return n 
def draw():
    for i in range(1, len(errors_tab)):
        print(errors_tab[i], end="\n")
while globalrunning:
    while running:
        try:
            word = getter()
            running = False
        except Exception as error:
            error = repr(error)
            if error == "Exception('002')":
                print("Can't enter a non alpha character")
            elif error == "Exception('001')":
                print("Need to input a correct text")
            elif error == "Exception('003')":
                print("Can't have a space inside your text")

    running2 = True
    msg("Game start !")
    tab = ["_"]*len(word)
    
    while running2:
        letter = input("Enter a letter > ")
        splitter = list(word)
        capted = 0
        for i in range(len(splitter)):
            if letter == splitter[i]:
                tab[i] = splitter[i]
                capted = 1
        msg("Current board : {}".format(" | ".join(tab)))
        
        if capted == 0:
            errors+=1 
            if errors==1:
                errors_tab[errors] = " ==========Y= "
                draw()
            if errors==2:
                errors_tab[errors] = " ||/       |  "
                draw()
            if errors==3:
                errors_tab[errors] = " ||        0  "
                draw()
            if errors==4:
                errors_tab[errors] = " ||       /|\ "
                draw()
            if errors==5:
                errors_tab[errors] = " ||       /|  "
                draw()
            if errors==6:                    
                errors_tab[errors] = "/||           "
                draw()
        capted = 0
        
       

        if errors == 7:
            errors_tab[errors] = "==============\n"
            draw()
            errors_tab = [[""]]*8
            msg("Game finished, you made 7 mistakes, the word was : {}".format(word))
            errors = 0
            total_points = 0
            running2 = False
            res = ending()
            if res == 1:
                running = True 
            elif res == 0:
                globalrunning = False
            
        if splitter == tab:
            errors=0
            total_points+=1
            errors_tab = [[""]]*8
            msg("Congrats ! The word was : {}.\nAlso you are in a streak of : {} points.".format(word, total_points))
            running2 = False
            res = ending()
            if res == 1:
                running = True 
            elif res == 0:
                globalrunning = False
        
