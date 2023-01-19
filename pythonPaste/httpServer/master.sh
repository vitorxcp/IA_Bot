while true
do
echo "s to start, q to exit, r to start/ restart."
read key

if [[ "$key" == 'r' ]]
then
    echo "Servidor rodando em 5562"
    echo
    kill $(lsof -t -i:5562)
    gnome-terminal -e "bash -c \"python3 httpServer.py 5562; exec bash\""       
elif [[ "$key" == 'q' ]]
then
    echo "Shutting Down... zzzz..."
    kill $(lsof -t -i:5562)
    exit;
elif [[ $key == 's' ]]
then
    echo "Starting :D"
    kill $(lsof -t -i:5562)
    gnome-terminal -e "bash -c \"python3 httpServer.py 5562; exec bash\""       
    
else
    echo
fi

done