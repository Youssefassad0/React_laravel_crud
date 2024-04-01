import './index.css'; // Import CSS for styling

function NotFound() {
  return (
    <div className="not-found-container">
      <div className="tv">
        <div className="antenna">
          <div className="antenna-shadow"></div>
          <div className="a1"></div>
          <div className="a1d"></div>
          <div className="a2"></div>
          <div className="a2d"></div>
          <div className="a-base"></div>
        </div>
        <div className="screen">
          <div className="screen-out">
            <div className="screen-out1">
              <div className="screen-content">
                <span className="not-found-text">NOT FOUND</span>
              </div>
            </div>
          </div>
        </div>
        <div className="lines">
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
        <div className="buttons">
          <div className="button b1"></div>
          <div className="button b2"></div>
          <div className="speakers">
            <div className="grille g1">
              <div className="grille-inner g11"></div>
              <div className="grille-inner g12"></div>
              <div className="grille-inner g13"></div>
            </div>
            <div className="grille g2"></div>
            <div className="grille g3"></div>
          </div>
        </div>
      </div>
      <div className="text-404">
        <div className="text-404-digit">4</div>
        <div className="text-404-digit">0</div>
        <div className="text-404-digit">4</div>
      </div>
    </div>
  );
}

export default NotFound;
