def exp_score1(board,list):
    maxn = 0
    k = 1
    for i in range(1, 7):
        list.append(i)
        score = exp_score2(board, list)
        list.pop()
        if (score > maxn):
            maxn = score
            k = i
    board[str(list)] = score
    return score


def exp_score2(board,list):
    maxn=0
    k=1
    for i in range(1, 7):
        list.append(i)
        score = exp_score3(board, list)
        list.pop()
        if(score>maxn):
            maxn=score
            k=i
    board[str(list)] = maxn
    return maxn

def exp_score3(board,list):
    score=0
    num=[0,0,0,0,0,0]
    for i in range(0,3):
        num[list[i]-1]+=1
    for i in range(0,6):
        score+=num[i]*num[i]*(i+1)
    board[str(list)]=score
    return score

def exp_socre():
    dict={}
    list=[]
    dict['[]']=-54
    for x1 in range(1,7):
        list.append(x1)
        exp_score1(dict,list)
        for x2 in range(1, 7):
            list.append(x2)
            exp_score2(dict, list)
            for x3 in range(1, 7):
                list.append(x3)
                exp_score3(dict,list)
                list.pop()
            list.pop()
        list.pop()
    return dict

def Exp_add(data,point):
    if point in data:
        k=data.count(point)
        if k==1:
            k=3
        if k==2:
            k=6
        return k*point
    else:
        return point

def Exp_lost(data,point):
    if point in data:
        k = data.count(point)
        return k * k * point
    else:
        return 0

def list_count(list):
    k=0
    for i in list:
        k+=1
    return k

def list_change(List):
    new_list=[]
    c=0
    for i in [0,3,6]:
        t=[]
        for j in range(0,3):
            if List[i+j]!=0:
                t.append(List[i+j])
        new_list.append(t)
    return new_list

def score_get(data):
    score=0
    num=[0,0,0,0,0,0]
    for i in data:
        num[i-1]+=1
    for i in range(0,6):
        score+=num[i]*num[i]*(i+1)
    return score

def AI_decide(my_data,his_data,point):

    situ=0
    set=1
    exp_dict=exp_socre()
    my_score=0
    his_score=0
    nt=[0,0,0]

    for i in range(0,3):
        my_score += score_get(my_data[i])
        his_score += score_get(his_data[i])

    situ=2
    maxn = 0
    change = 54
    for i in range(0,3):
        if(list_count(my_data[i])==3):
            print(i,":max!")
        else:

            my_max=exp_dict[str(my_data[i])]
            his_max=exp_dict[str(his_data[i])]

            my_data[i].append(point)
            my_exp = exp_dict[str(my_data[i])]
            my_data[i].pop()

            ans=0
            while point in his_data[i]:
                his_data[i].remove(point)
                ans+=1
            his_exp = exp_dict[str(his_data[i])]
            while ans:
                ans-=1
                his_data[i].append(point)

            pd=my_exp-his_exp
            pd2=my_max-his_exp
            pd3=pd-pd2

            score=Exp_add(my_data[i],point)+Exp_lost(his_data[i],point)
            rate=score/(list_count(my_data[i])+1)

            print(i,":",my_max - my_exp)
            nt[i]=my_max
            if score>=9:
                set=i
                situ=1
            if situ==2:
                if my_max - my_exp < change:
                    change = my_max - my_exp
                    set = i
                elif my_max - my_exp == change:
                    if my_max>nt[set]:
                        set = i




    return set+1

def nextStep(ownBoard,otherBoard,figure):
    ownBoard=list_change(ownBoard)
    otherBoard=list_change(otherBoard)
    return AI_decide(ownBoard,otherBoard,figure)


