(function($){


	$.fn.saveTheOrphans = function(_options) {

		// Defaults
		var options = {  
			limit: 1
		};

		// Set Options
		$.extend(options,_options);


		// Function to be applied to all selected elements
		function fixOrphans() {

			// Get a jQuery object for the element
			var $elm = $(this);

			// Get a clone of the original element to store the last state
			var $_elm = $elm.clone();

			// Get the original width of the element
			var original_width = $elm.width();

			// Set the count variable for this element
			var count = options.limit;

			// Recursive function to apply the fix
			function fix() {

				if (count > 0) {

					// Get the last child node of the element
					var $last_node = this.contents().last();

					switch ($last_node.get(0).nodeType) {

						case 3:

							// Get the text of the last node
							var last_node_text = $last_node.text();

							// Check if the text node contains any spaces
							if (last_node_text.indexOf(' ') != -1) {
								

								// Replace the last space in the text with an &nbsp;
								$last_node.replaceWith(last_node_text.replace(/( )([^ ]*)?$/,'&nbsp;$2'));

								// Decrement the count for this element
								count--;

								return fix.call(this);

							} else {

								// Recursive function to check previous node
								function fixPreviousNode() {

									$previous_node = this.parent().prev();

									if ($previous_node.length > 0) {

										switch ($previous_node.get(0).nodeType) {

											case 3:

												var previous_node_text = $previous_node.text();

												if (previous_node_text.indexOf(' ') != -1) {

													// Replace the last space in the text with an &nbsp;
													$previous_node.replaceWith(previous_node_text.replace(/( )([^ ]*)?$/,'&nbsp;$2'));

													// Decrement the count for this element
													count--;

												} else {

													// Check the previous node
													return fixPreviousNode.call($previous_node);

												}

												break;

											default:

												return fix.call($previous_node);

										}

									} else {

										return 1;

									}

								}

								// move to the previous node

								console.log('Moving to previous node....',$last_node);

								return fixPreviousNode.call($last_node);

							}							

						default:

							// Call the fix function recursively
							return fix.call($last_node);

					}

				}

			}

			// Run the fix function and return
			return fix.call($elm);

		}

		// Apply the fix to each selected element and return the collection
		return this.each(fixOrphans);

	}


})(jQuery);