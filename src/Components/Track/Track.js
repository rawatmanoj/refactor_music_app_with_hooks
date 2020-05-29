import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { token } from "../../spotify/spotify";
import Spotify from "spotify-web-api-js";
import { Context } from "../../store/store";
import { parsePitchClass } from "../../utils/utils";
import Chart from "./Chart/Chart";
import "./Track.scss";

const spotifyWebApi = new Spotify();
const Track = () => {
  const [state, dispatch] = useContext(Context);

  spotifyWebApi.setAccessToken(token);

  const params = new useParams();

  async function fetchTrack() {
    const res = await spotifyWebApi.getTrack(params.trackId);
    //console.log(res);
    dispatch({ type: "TRACK", payload: res });
  }

  async function fetchAudioFeatures() {
    const res = await spotifyWebApi.getAudioAnalysisForTrack(params.trackId);
    const res2 = await spotifyWebApi.getAudioFeaturesForTrack(params.trackId);
    //  console.log(res);
    //console.log(res2);
    dispatch({ type: "AUDIOANALYSIS", payload: res });
    dispatch({ type: "AUDIOFEATURES", payload: res2 });
  }

  useEffect(() => {
    fetchTrack();
    fetchAudioFeatures();
  }, []);
  console.log(state);
  return (
    <div className="track-container">
      {state.track ? (
        <div className="track-body-container">
          <div className="track-upper-conatiner">
            <div className="track-image-conatiner">
              <img
                className="track-image"
                src={state.track.album.images[0].url}
              />
            </div>
            <div className="track-info">
              <div className="track-name">{state.track.name}</div>
              <div className="track-artist-container">
                {state.track.artists.map((artist) => {
                  return (
                    <div className="track-artist-name">
                      {artist.name} &nbsp;
                    </div>
                  );
                })}
              </div>
              <div className="track-album-name">{state.track.album.name}</div>
            </div>
          </div>
          <div className="heading-audio-features"> Audio Features</div>
          {state.audioAnalysis && state.audioFeatures ? (
            <div className="track-middle-conatiner">
              <div className="track-middle-box track-duration">
                <div>
                  {(state.audioFeatures.duration_ms / (1000 * 60)).toFixed(2)}
                </div>
                <div className="track-box-lower">Duration</div>
              </div>

              <div className="track-middle-box track-key">
                <div> {parsePitchClass(state.audioFeatures.key)} </div>
                <div className="track-box-lower">Key</div>
              </div>
              <div className="track-middle-box track-modality">
                <div>{state.audioFeatures.mode === 1 ? "Major" : "Minor"} </div>
                <div className="track-box-lower">Modality</div>
              </div>
              <div className="track-middle-box track-time">
                <div> {state.audioFeatures.time_signature} </div>
                <div className="track-box-lower">Time Signature</div>
              </div>
              <div className="track-middle-box track-tempo">
                <div> {Math.ceil(state.audioFeatures.tempo)} </div>
                <div className="track-box-lower">Tempo (BPM)</div>
              </div>
              <div className="track-middle-box track-popularity">
                <div> {state.track.popularity}% </div>
                <div className="track-box-lower">Popularity</div>
              </div>
              <div className="track-middle-box track-bars">
                <div> {state.audioAnalysis.bars.length} </div>
                <div className="track-box-lower">Bars</div>
              </div>
              <div className="track-middle-box track-beats">
                <div> {state.audioAnalysis.beats.length} </div>
                <div className="track-box-lower">Beats</div>
              </div>
              <div className="track-middle-box track-sections">
                <div> {state.audioAnalysis.sections.length} </div>
                <div className="track-box-lower">Sections</div>
              </div>
              <div className="track-middle-box track-segments">
                <div> {state.audioAnalysis.segments.length} </div>
                <div className="track-box-lower">Segments</div>
              </div>
            </div>
          ) : null}

          <div className="track-lower-conatiner">
            <Chart />
          </div>
          <div className="chart-audio-features">
            Full Description of Audio Features
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Track;
