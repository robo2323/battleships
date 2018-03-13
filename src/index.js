import view from './components/view';
import './css/style.css';

const app = function() {
  const component = document.createElement('div');
  component.id = 'app';
  component.innerHTML = `<div id="paper-container">


    <div id="paper1"></div>
    <div id="paper2">
        <div class="board">
            <div id="track-area" class="divider"></div>
            <div class="divider">
                <div class="ship-container p1-ship-container">
                    <button id="place-randomly">Place Randomly</button>

                    <div data-ship="Carrier" data-placed="false" id="carrier" class="ship clickable current-ship-selected">
                    <p>Carrier</p>
                    <div class="stern"><=</div>
                    <div>=</div>
                    <div>=</div>
                    <div>=</div>
                    <div class="bow">=]</div>
                    </div>
                    <div data-ship="Battleship" data-placed="false" id="battleship" class="ship clickable">
                    <p>Battleship</p>
                    
                        <div class="stern"><<</div>
                        <div>[]</div>
                        <div>[]</div>
                        <div class="bow">>></div>
                    </div>
                    <div data-ship="Cruiser" data-placed="false" id="cruiser" class="ship clickable">
                    <p>Cruiser</p>
                    
                    <div class="stern"><<</div>
                    <div>[]</div>
                    <div class="bow">>></div>
                    </div>
                    
                    <div data-ship="Destroyer_One" data-placed="false" id="destroyer-one" class="ship clickable">
                    <p>Destroyers</p>                    
                    
                    <div class="stern"><[</div>
                    <div class="bow">]></div>
                    </div>
                    <div data-ship="Destroyer_Two" data-placed="false" id="destroyer-two" class="ship clickable">
                    <div class="stern"><[</div>
                    <div class="bow">]></div>
                    </div>
                    <div data-ship="Sub_One" data-placed="false" id="sub-one" class="ship clickable">
                    <p>Subs</p>
                    
                        <div class="bow stern"><^</div>
                    </div>
                    <div data-ship="Sub_Two" data-placed="false" id="sub-two" class="ship clickable">
                    <div class="bow stern"><^</div>                

                    </div>
                </div>
                <!--end  p1-ship container-->
            </div>
            <!--end  p1-ship-area/divider-->
            <div class="divider">
            <h1>Battleships!</h1>
            </div>
            <div id="play-area" class="divider"></div>

        </div>
    </div>
    <div id="paper3"></div>
    <div id="paper4"></div>
    <div id="paper5"></div>
    <div id="paper6"></div>


</div>
`;
  return component;
};

document.body.appendChild(app());
view();