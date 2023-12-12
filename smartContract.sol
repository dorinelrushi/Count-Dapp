//pragma

contract SimpleCounter {
    uint256 public counter;
    address public owner;

    constructor () {
        counter = 0;
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "only owner can call this function");
        _;
    }

    function increment() public {
        counter++;
    }
        function decrement() public {
            require(counter > 0,'Counter cannot be neagive');
        counter--;
    }
    function reset () public onlyOwner{
        counter = 0;
    }
    function getCount() public view returns (uint256){
        return counter;
    }
}
