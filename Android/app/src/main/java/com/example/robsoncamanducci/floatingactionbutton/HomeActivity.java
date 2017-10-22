package com.example.robsoncamanducci.floatingactionbutton;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

public class HomeActivity extends AppCompatActivity {

    public TextView txtBotao;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);



        setContentView(R.layout.activity_home);




        final TextView button = (TextView) findViewById(R.id.txtBotao);
        button.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {


                Toast.makeText(HomeActivity.this, "clicado", Toast.LENGTH_SHORT).show();

            }
        });


    }
}
