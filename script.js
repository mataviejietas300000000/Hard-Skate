function abrirSeccion(id){
			location.hash = '#' + id;
		}
		var enlaces = document.querySelectorAll('.site-nav a');
		var menuPrincipal = document.getElementById('menuPrincipal');
		enlaces.forEach(function(enlace){
			enlace.addEventListener('click', function(){
				if(window.bootstrap && menuPrincipal.classList.contains('show')){
					bootstrap.Collapse.getOrCreateInstance(menuPrincipal).hide();
				}
			});
		});

		var observador = new IntersectionObserver(function(entradas){
			entradas.forEach(function(e){
				if(e.isIntersecting){
					var menu = e.target.dataset.menu || e.target.id;
					enlaces.forEach(function(a){
						a.classList.toggle('activo', a.getAttribute('href') === '#' + menu);
					});
				}
			});
		}, { rootMargin: '-45% 0px -50% 0px' });
		document.querySelectorAll('main section').forEach(function(s){ observador.observe(s); });
		document.querySelectorAll('form.formulario').forEach(function(form){
			var estado = form.querySelector('.estado');
			var tel = form.querySelector('input[type=tel]');

			function validarTelefono(){
				if(!tel.required && !tel.value.trim()){ tel.setCustomValidity(''); return; }
				var digitos = tel.value.replace(/\D/g, '');
				tel.setCustomValidity(digitos.length >= 8 && digitos.length <= 15 ? '' : 'Escribe un teléfono de 8 a 15 dígitos.');
			}
			tel.addEventListener('input', validarTelefono);

			form.addEventListener('submit', function(ev){
				ev.preventDefault();
				validarTelefono();
				if(!form.checkValidity()){
					estado.className = 'estado error';
					estado.textContent = 'Revisa los campos marcados.';
					form.reportValidity();
					return;
				}
				var nombre = form.querySelector('[name=nombre]').value.trim();
				estado.className = 'estado';
				if(form.id === 'form-donacion'){
					var monto = Number(form.querySelector('[name=monto]').value);
					estado.textContent = '¡Gracias, ' + nombre + '! Recibimos tu donación de $' + monto.toLocaleString('es-MX') + ' MXN.';
				}else{
					var tipo = (form.querySelector('[name=tipo]') || {}).value || 'mensaje';
					estado.textContent = '¡Gracias, ' + nombre + '! Recibimos tu ' + tipo.toLowerCase() + ' sobre la página.';
				}
				form.reset();
			});
		});
