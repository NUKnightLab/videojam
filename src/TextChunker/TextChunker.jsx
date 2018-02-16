import React from 'react';
import './TextChunker.css';


export default class TextChunker extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      open: false,
		}
    this.closeModal = this.closeModal.bind(this);
    this.chunkText = this.chunkText.bind(this);
  }

  closeModal() {
    this.setState({ 'open': false, });
  }

  newTextInput() {
    if (document.getElementById('do-chunk').innerHTML != 'Preview') {
      document.getElementById('do-chunk').innerHTML = 'Preview';
    }
  }

  splitSentences() {
  	var chunkArray = [];
  	var text = document.getElementById("text-to-chunk").value;
  	var array = this.sentenceSplits(text);
  	//setTiming(array);
      var numberOfSentences = array.length;
      var i = 0;
      while (i < numberOfSentences) {
      	chunkArray = this.splitSentencesHelper(array[i], chunkArray);
      	i++;
      }
      this.outputChunks(chunkArray);
  }


  // Takes a paragraph and pushes each segment to an array based off of period locations. Does not account for the possible
  // use of a period for an inital or other use cases.
  sentenceSplits(text, chunkArray) {
  	var sentenceArray = text.split(". ");
  	for (var i = sentenceArray.length - 2; i >= 0; i--) {
  		sentenceArray[i] = sentenceArray[i] + ".";
  	}
  	return sentenceArray;
  }

  // Directs the path of the sentence to check against specific parameters
  splitSentencesHelper(sentence, chunkArray) {
  	if (this.countWords(sentence)<=12) {
  		chunkArray.push(sentence);
      return chunkArray;
  	}
  	else if (this.hasConjuction(sentence)) {
  		return this.splitBeforeConjuction(sentence, chunkArray);
  	}
  	else if (this.hasComma(sentence)) {
  		return this.splitAfterComma(sentence, chunkArray);
  	}
  	//else if (this.hasCutWord(sentence)) {
  	//	return this.splitBeforeCutWord(sentence, chunkArray);
  	//}
  	else {
  		chunkArray.push(sentence);
      return chunkArray;
  	}
  }

  // Counts the number of words in the given sentence.
  countWords(sentence) {
  	var sentenceWords = sentence.split(" ");
  	return sentenceWords.length;
  }

  // Checks if the given sentence has a conjuction and returns a boolean. Right now it only checks for 'but' and 'and'
  hasConjuction(sentence) {
  	var andSplit = sentence.split(" and ");
  	if (sentence.indexOf("and") !== -1 || sentence.indexOf("but") !== -1) {
  		if (this.isThisAndList(andSplit)) {
  			return false;
  		}
  		else {
  			return true;
  		}
  	}
  	else {
  		return false;
  	}
  }

  // Checks if the given sentence has any commas. Makes sure that it isnt part of a list though.
  hasComma(sentence) {
  	var count = 0;
  	if (sentence.indexOf(",") !== -1) {
  		var commaSplit = sentence.split(", ");
  		var afterCommaSplit = commaSplit[1].split(" ");
  		if (commaSplit.length>2) {
  			return true;
  		}
  		else if (commaSplit[0].split(" ").length < 4 && commaSplit[1].split(" ").length < 4) {
  			return false;
  		}
  		else {
  			return true;
  		}
  	}
  }

  /*hasCutWord(sentence) {
  	cutWords = [];
  	for (var i = listOfCutWords.length - 1; i >= 0; i--) {
  		if (sentence.indexOf(listOfCutWords[i] + " ") != -1) {
  			cutWords.push(listOfCutWords[i])
  		}
  	}
  	if (cutWords.length > 0) {
  		return true;
  	}
  	else {
  		return false;
  	}
  }*/

  // Checks the different parts of the agiven array for the number of words in each part with the hopes of
  // deducing if the words are part of a list
  isThisAndList(array) {
  	var andSplitLength = array.length
  	var i = 0;
  	while (i<andSplitLength) {
  		var segmentOfWords = array[i].split(" ")
  	    if (segmentOfWords.length < 3) {
  	    	return true
  	    }
  	    i++;
  	}
  }

  // Splits the sentence before the conjuction if the conjuction is at least the fifth word in the sentence
  splitBeforeConjuction(sentence, chunkArray) {
  	var sentenceWords = sentence.split(" ")
  	if (sentenceWords.indexOf("and") >= 5) {
  		var position = sentenceWords.indexOf("and");
  		chunkArray = this.formSegment(sentenceWords.slice(0, position), chunkArray);
  		return this.formSegment(sentenceWords.slice(position, sentenceWords.length, chunkArray));
  	}
  	else if (sentenceWords.indexOf("but") >= 5) {
  		var position = sentenceWords.indexOf("but");
  		chunkArray = this.formSegment(sentenceWords.slice(0, position), chunkArray);
  		return this.formSegment(sentenceWords.slice(position, sentenceWords.length), chunkArray);
  	}
  	else {
  		chunkArray.push(sentence);
      return chunkArray;
  	}
  }

  // Takes a sentence and splits it after the comma in the sentence, making two different segments which are pushed
  // to the segment array
  splitAfterComma(sentence, chunkArray) {
  	var commaSplit = sentence.split(", ");
  	if (commaSplit.length > 2) {
  		for (var i = 0; i <= commaSplit.length - 1; i++) {
  	        if (commaSplit[i].split(" ").length < 5 && i!==(commaSplit.length - 1)) {
  	        	commaSplit[i+1] = commaSplit[i] + ", " + commaSplit[i+1];
                  commaSplit.splice(i, 1);
  			}
  		}
  		if (commaSplit.length === 2) {
  			chunkArray.push(commaSplit[0] + ", ");
  			chunkArray.push(commaSplit[1]);
        return chunkArray;
  		}
  	}
  	else {
  		var firstSegment = commaSplit[0] + ",";
  		chunkArray.push(firstSegment);
  		chunkArray.push(commaSplit[1]);
      return chunkArray;
  	}
  }

  /*splitBeforeCutWord(sentence, chunkArray) {
  	var lowest = [];
  	if (cutWords.length > 1) {
  		var cutWordSplit = sentence.split(" ");
  		if (cutWordSplit.indexOf((cutWords.length - 1)) >=5 ) {
  			lowest = [cutWords[(cutWords.length - 1)], cutWordSplit.indexOf((cutWords.length - 1))];
  		}
  		for (var i = cutWords.length - 2; i >= 0; i--) {
  			var index = cutWordSplit.indexOf(cutWords[i]);
  			if (index >= 5) {
  				index<lowest[1] && (lowest=[cutWords[i], index]);
  			}
  		}
  		if (lowest.length != 0) {
  			var aaa = sentence.split(lowest[0]);
  			if (aaa.length === 2) {
  				chunkArray.push(aaa[0]);
  				chunkArray.push(aaa[1]);
          return chunkArray;
  			}
  			else {
  				chunkArray.push(sentence);
          return chunkArray;
  			}
  		}
  	}
  	else {
  		var cutWordSplit = sentence.split(cutWords[0]);
  		if (cutWordSplit.length === 2) {
  			if (cutWordSplit[0].split(" ").length >= 5 && cutWordSplit[1].split(" ").length >= 5) {
  				chunkArray.push(cutWordSplit[0]);
  				chunkArray.push(cutWords[0] + cutWordSplit[1]);
          return chunkArray;
  			}
  		}
  		else {
  			chunkArray.push(sentence);
        return chunkArray;
  		}
  	}
  }*/

  // Takes an array of words and creates a single string segment from the array. It then pushes the segment to the
  // array with the rest of the segments.
  formSegment(segmentArray, chunkArray) {
      var segmentLength = segmentArray.length;
      var firstWordToSegment = segmentArray[0] + " ";
      for (var i = 1; i < (segmentLength-1); i++) {
      	firstWordToSegment = firstWordToSegment + segmentArray[i] + " ";
      }
      var wholeSegment = firstWordToSegment + segmentArray[(segmentLength-1)];
      chunkArray.push(wholeSegment);
      return chunkArray;
  }


  setTiming(seg) {
    var wpm = 180;
    var delay = 1500;
    var bonus = 1000;

    var words = seg.split(' ').length;
    var words_time = ((words/wpm) * 60) * 1000;
    var total_time = Math.round(((delay + words_time + bonus)/1000)*100)/100;
      console.log('seg: ', seg);
      console.log('total_time: ', total_time);
    return total_time;
  }

  outputChunks(chunkArray) {
  	var textOutput;
  	document.getElementById('text-to-chunk').value = '';
  	for (var i = 0; i < chunkArray.length; i++) {
  		if (i === 0) {
  			textOutput = chunkArray[i];
  			if (chunkArray.length === 1) {
  				document.getElementById('text-to-chunk').value = textOutput;
  			}
  		}
  		else {
  			textOutput = textOutput + '\n \n' + chunkArray[i];
  			if (i === (chunkArray.length-1)) {
  				document.getElementById('text-to-chunk').value = textOutput;
  			}
  		}
  	}
    document.getElementById('do-chunk').innerHTML = 'Chunk Text';
  }

  chunkText() {

    if (document.getElementById('do-chunk').innerHTML == 'Preview') {
      this.splitSentences();
    }

    else {
      var textSegmentsArray = [];
      var textSegments = document.getElementById('text-to-chunk').value;
      textSegmentsArray = textSegments.split('\n \n');
      for (var i = (textSegmentsArray.length - 1); i >= 0; i--) {
        if (textSegmentsArray[i] === "") {
          textSegmentsArray.splice(i, 1);
        }
      }
      for (var i = 0; i <= (textSegmentsArray.length - 1); i++) {
        this.props.populateCards('', textSegmentsArray[i]);
      }
      this.closeModal();
    }
  }

  render() {
    const modalStatus = {
      display: this.state.open ? 'initial' : 'none',
    }
    return (
      <div id="text-chunker" style={modalStatus}>
        <h3 id="modal-header"> Enter your story to begin </h3>
        <textarea
          id="text-to-chunk"
          onChange={this.newTextInput}
        >
        </textarea>

        <button id="do-chunk" onClick={this.chunkText}>Preview</button>
        <button id="dont-chunk" onClick={this.closeModal}> Not Now </button>

      </div>

    )
  }
}
