		file.removed = status[1] == 'D';
      	      	
      	// Shift away index, ---, +++ and @@ stuff
      	if (lines.shift().indexOf('index ') == 0) lines.shift();
      	lines.shift();
		var originalLine, newLine;
			var line = lines.shift();
			if (line.indexOf('@@ ') == 0) {
				var changeGroup = /@@ -(\d+)(,\d+)? [+](\d+)(,\d+)?/.exec(line);
				originalLine = changeGroup[1];
				newLine = changeGroup[3];
				diff_lines.push([null, null, line]);
			} else {
				if (line[0] == '+') {
					diff_lines.push([null, newLine++, line]);
				} else if (line[0] == '-') {
					diff_lines.push([originalLine++, null, line]);
				} else {
					diff_lines.push([originalLine++, newLine++, line]);
				}
			}
}

exports.parseGitTags = function(text) {
	return text.split('\n').filter(function(tag) {
		return tag != '';
	});
}

exports.parseGitRemotes = function(text) {
	return text.split('\n').filter(function(remote) {
		return remote != '';
	});
}


exports.parseGitRemoteShow = function(text) {
	var lines = text.split('\n');
	return {
		fetch: lines[1].slice('  Fetch URL: '.length),
		push: lines[1].slice('  Push  URL: '.length)
	};
}